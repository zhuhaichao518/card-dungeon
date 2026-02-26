/**
 * battle.js - 卡牌战斗系统（支持状态效果）
 *
 * 状态效果：
 *   poison  - 每回合开始扣N伤，每回合-1（叠加）
 *   burn    - 每回合开始扣N伤，每回合-1（不叠加，取最大值）
 *   weakness- 攻击伤害减半，持续N回合
 *   strength- 攻击伤害+N，持续N回合
 *
 * 回合流程：
 *   startNewTurn()
 *     ├─ 玩家效果触发（毒/烧扣血）
 *     ├─ 怪物摸牌 + 决定意图
 *     ├─ 英雄摸牌 + 恢复行动值 + 清空护盾
 *     └─ 更新 UI
 *   玩家出牌…
 *   endPlayerTurn()
 *     ├─ 怪物效果触发（毒/烧扣血）
 *     ├─ 怪物执行意图
 *     └─ startNewTurn()
 */

import {
  state, addMessage,
  damagePlayer, damageMonster, healPlayer,
  drawCards, discardHand, shuffle, loadFloor,
} from './state.js';
import { HERO_CARD_POOL, REWARD_CARD_POOL } from './data.js';
import { renderMap } from './renderer.js';
import {
  updateBattleUI, updateExploreUI,
  showBattleScreen, hideBattleScreen,
} from './ui.js';

// ─────────────────────────────────────────────────────────────────────────────
// 开始战斗
// ─────────────────────────────────────────────────────────────────────────────
export function startBattle(monster) {
  state.phase = 'battle';
  const { battle, player, deck } = state;

  battle.monster = monster;
  battle.turn    = 0;
  battle.log     = [];

  // 英雄重置
  player.shield  = 0;
  player.effects = { poison:0, burn:0, weakness:0, strength:0 };
  battle.hero    = { ap:0, turnApMax:0 };

  // 怪物重置
  monster.shield  = 0;
  monster.effects = { poison:0, burn:0, weakness:0, strength:0 };
  const en = battle.enemy;
  en.ap = 0; en.turnApMax = 0;
  en.hand = []; en.discardPile = []; en.intent = [];
  en.drawPile = shuffle([...monster.deck]);

  // 英雄牌组重置（战斗内使用全部牌洗好）
  deck.drawPile    = shuffle([...deck.allCards]);
  deck.hand        = [];
  deck.discardPile = [];

  showBattleScreen();
  blogf(`⚔️ 与【${monster.name}】的战斗开始！`);
  startNewTurn();
}

// ─────────────────────────────────────────────────────────────────────────────
// 新回合
// ─────────────────────────────────────────────────────────────────────────────
function startNewTurn() {
  const { battle, player } = state;
  battle.turn++;
  const t = battle.turn;

  // ─ 1. 玩家状态效果触发 ────────────────────────────────────────────────────
  tickEffects(player, 'hero');

  if (player.hp <= 0) { showGameOver(); return; }

  // ─ 2. 怪物摸牌 & 决定意图 ─────────────────────────────────────────────────
  const monster = battle.monster;
  const en = battle.enemy;

  en.turnApMax = Math.min(t, monster.maxAp);
  en.ap        = en.turnApMax;

  en.discardPile.push(...en.hand);
  en.hand = [];
  for (let i = 0; i < monster.handSize; i++) {
    if (en.drawPile.length === 0) {
      if (en.discardPile.length === 0) break;
      en.drawPile    = shuffle(en.discardPile);
      en.discardPile = [];
    }
    en.hand.push(en.drawPile.pop());
  }
  en.intent = calcIntent(en.hand, en.ap);

  // ─ 3. 英雄摸牌 & 恢复行动值 ──────────────────────────────────────────────
  player.shield  = 0;
  const hero = battle.hero;
  hero.turnApMax = Math.min(t, player.maxAp);
  hero.ap        = hero.turnApMax;

  // 临时强化效果 - 已在effectState中追踪，本回合不重置
  discardHand();
  drawCards(player.handSize);

  blogf(`── 第 ${t} 回合 ── 行动值 ${hero.ap}/${hero.turnApMax}`);
  updateBattleUI();
}

/** 触发状态效果（毒/烧扣血，效果-1） */
function tickEffects(entity, role) {
  const e = entity.effects || {};

  if (e.poison > 0) {
    const dmg = e.poison;
    if (role === 'hero') {
      damagePlayer(dmg);
      blogf(`☠️ 中毒发作：受到 ${dmg} 点毒素伤害`);
    } else {
      damageMonster(entity, dmg);
      blogf(`☠️ ${entity.name} 中毒发作：受到 ${dmg} 点毒素伤害`);
    }
    e.poison = Math.max(0, e.poison - 1);
  }

  if (e.burn > 0) {
    const dmg = e.burn;
    if (role === 'hero') {
      damagePlayer(dmg);
      blogf(`🔥 灼烧发作：受到 ${dmg} 点灼烧伤害`);
    } else {
      damageMonster(entity, dmg);
      blogf(`🔥 ${entity.name} 灼烧发作：受到 ${dmg} 点灼烧伤害`);
    }
    e.burn = Math.max(0, e.burn - 1);
  }

  // 虚弱/强化持续时间-1
  if (e.weakness > 0) e.weakness--;
  if (e.strength > 0) e.strength--;
}

/** 贪心：从高费到低费，尽量花完行动值 */
function calcIntent(hand, ap) {
  const sorted = [...hand].sort((a, b) => b.cost - a.cost);
  const intent = []; let rem = ap;
  for (const c of sorted) {
    if (c.cost <= rem) { intent.push(c); rem -= c.cost; }
  }
  return intent;
}

// ─────────────────────────────────────────────────────────────────────────────
// 英雄出牌
// ─────────────────────────────────────────────────────────────────────────────
export function playCard(handIndex) {
  if (state.phase !== 'battle') return;
  const card = state.deck.hand[handIndex];
  if (!card) return;

  const hero = state.battle.hero;
  if (hero.ap < card.cost) { blogf('⚡ 行动值不足！'); return; }

  hero.ap -= card.cost;
  state.deck.hand.splice(handIndex, 1);
  state.deck.discardPile.push(card);

  executeHeroCard(card);

  if (state.battle.monster?.hp <= 0) { endBattle(true); return; }

  // 如果本回合strength还在（未打出所有牌），继续；否则正常刷新
  updateBattleUI();
}

function executeHeroCard(card) {
  const monster = state.battle.monster;
  const player  = state.player;
  const eff     = player.effects;

  if (card.type === 'attack') {
    let dmg = card.value;
    // 强化加成
    if (eff.strength > 0) dmg += eff.strength;
    // 虚弱减半
    if (eff.weakness > 0) dmg = Math.floor(dmg * 0.5);

    const hits = card.hits || 1;
    let total = 0;
    for (let i = 0; i < hits; i++) {
      damageMonster(monster, dmg);
      total += dmg;
    }

    let log = `🗡 【${card.name}】→ ${hits > 1 ? dmg+'×'+hits+'=' : ''}${total} 伤害`;

    // 毒爆：对中毒目标额外爆发
    if (card.poisonExploit && (monster.effects?.poison || 0) > 0) {
      const bonus = monster.effects.poison * 2;
      damageMonster(monster, bonus);
      total += bonus;
      log += ` + 毒爆 ${bonus}`;
    }
    // 龙杀：对灼烧目标额外
    if (card.burnExploit && (monster.effects?.burn || 0) > 0) {
      const bonus = card.burnExploit;
      damageMonster(monster, bonus);
      total += bonus;
      log += ` + 龙杀 ${bonus}`;
    }

    // 吸血效果（攻击顺带回血）
    if (card.healOnHit && total > 0) {
      healPlayer(card.healOnHit);
      log += ` + 吸血 +${card.healOnHit}HP`;
    }

    blogf(log);

    // 施加状态
    applyEffectsToTarget(card, monster);

  } else if (card.type === 'skill') {
    if (card.isHeal) {
      healPlayer(card.value);
      blogf(`💊 【${card.name}】→ 恢复 ${card.value} HP`);
    } else if (card.counterDmg) {
      player.shield += card.value;
      damageMonster(monster, card.counterDmg);
      blogf(`🛡 【${card.name}】→ +${card.value} 护盾，反弹 ${card.counterDmg} 伤害`);
    } else if (card.strengthSelf) {
      // 强化自身：设置strength效果
      player.effects.strength = card.strengthSelf;
      player.shield += (card.value || 0);
      blogf(`💪 【${card.name}】→ 强化 +${card.strengthSelf}（${card.strengthSelf} 回合攻击加成）`);
    } else {
      // 普通护盾
      player.shield += card.value;
      blogf(`🛡 【${card.name}】→ 获得 ${card.value} 护盾`);
    }
    // 护盾牌也可以有draw
    if (card.draw) drawCards(card.draw);
  }

  // 摸牌（部分攻击牌也有摸牌效果）
  if (card.type === 'attack' && card.draw) drawCards(card.draw);
}

/** 将卡牌的状态效果施加给目标 */
function applyEffectsToTarget(card, target) {
  const e = target.effects || (target.effects = { poison:0, burn:0, weakness:0, strength:0 });
  if (card.poison)   e.poison  += card.poison;
  if (card.burn)     e.burn     = Math.max(e.burn, card.burn);  // 灼烧取最大
  if (card.weakness) e.weakness = Math.max(e.weakness, card.weakness);
}

// ─────────────────────────────────────────────────────────────────────────────
// 英雄结束回合 → 怪物执行
// ─────────────────────────────────────────────────────────────────────────────
export function endPlayerTurn() {
  if (state.phase !== 'battle') return;

  blogf('── 玩家结束回合 ──');

  const monster = state.battle.monster;
  const en = battle_();

  // 怪物状态效果触发
  tickEffects(monster, 'enemy');
  if (monster.hp <= 0) { endBattle(true); return; }

  // 怪物清护盾（轮到怪物行动前清零旧护盾）
  monster.shield = 0;

  // 怪物执行意图
  for (const card of en.intent) {
    executeMonsterCard(card, monster);
    if (state.player.hp <= 0) { showGameOver(); return; }
  }
  en.intent = [];

  startNewTurn();
}

function executeMonsterCard(card, monster) {
  const player = state.player;

  if (card.type === 'attack') {
    let dmg = card.value;
    if (monster.effects?.strength > 0) dmg += monster.effects.strength;
    const hits = card.hits || 1;
    let total = 0;
    for (let i = 0; i < hits; i++) {
      const real = damagePlayer(dmg);
      total += real;
    }
    const raw = dmg * hits;
    blogf(`👾 ${monster.name}【${card.name}】→ ${raw} 伤害（实际 ${total}，盾挡 ${raw-total}）`);
    // 怪物攻击牌也可施加状态给玩家
    applyEffectsToTarget(card, player);
  } else if (card.type === 'skill') {
    monster.shield += card.value;
    blogf(`👾 ${monster.name}【${card.name}】→ 获得 ${card.value} 护盾`);
    if (card.strength) monster.effects.strength = Math.max(monster.effects.strength || 0, card.strength);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 战斗结束
// ─────────────────────────────────────────────────────────────────────────────
function endBattle(playerWon) {
  const monster = state.battle.monster;
  blogf(`🎉 击败了 ${monster.name}！`);

  const idx = state.monsters.indexOf(monster);
  if (idx !== -1) state.monsters.splice(idx, 1);

  // 奖励：从完整奖励池随机一张（兼容两种导出名）
  const pool = HERO_CARD_POOL || REWARD_CARD_POOL || [];
  if (!pool.length) { addMessage('（无奖励卡牌）'); }
  const reward = pool[Math.floor(Math.random() * pool.length)];
  state.deck.allCards.push({ ...reward });
  addMessage(`🏆 获得奖励卡：【${reward.name}】`);

  state.phase = 'explore';
  discardHand();
  state.battle.monster      = null;
  state.battle.enemy.intent = [];

  hideBattleScreen();
  renderMap();
  updateExploreUI();
  showVictoryOverlay(reward);
}

// ─────────────────────────────────────────────────────────────────────────────
// UI 弹窗
// ─────────────────────────────────────────────────────────────────────────────
function showVictoryOverlay(card) {
  const ov = document.getElementById('overlay');
  document.getElementById('overlay-title').textContent = '🎉 战斗胜利！';
  document.getElementById('overlay-msg').innerHTML = `
    获得奖励卡牌：
    <div class="reward-card card card-${card.type}" style="margin:12px auto;cursor:default;max-width:120px">
      <div class="card-cost-badge ap-badge-${card.type}">⚡${card.cost}</div>
      <div class="card-name" style="padding-top:10px">${card.name}</div>
      <div class="card-desc">${card.desc}</div>
    </div>`;
  const btn = document.getElementById('overlay-btn');
  btn.textContent = '继续探索';
  btn.onclick = () => ov.classList.add('hidden');
  ov.classList.remove('hidden');
}

function showGameOver() {
  hideBattleScreen();
  state.phase = 'gameover';
  document.getElementById('overlay-title').textContent = '💀 游戏结束';
  document.getElementById('overlay-msg').textContent   = '你在地牢中倒下了……';
  const btn = document.getElementById('overlay-btn');
  btn.textContent = '重新开始';
  btn.onclick = () => location.reload();
  document.getElementById('overlay').classList.remove('hidden');
}

// ─── helpers ────────────────────────────────────────────────────────────────
function blogf(msg) {
  state.battle.log.push(msg);
  if (state.battle.log.length > 40) state.battle.log.shift();
  addMessage(msg);
}
function battle_() { return state.battle.enemy; }
