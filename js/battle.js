/**
 * battle.js - 卡牌战斗系统
 *
 * 行动值规则（英雄与怪物对等）：
 *   本回合行动值 = min(回合数, 自身最大行动值)
 *   回合1 → 1点, 回合2 → 2点, 回合3+ → 最大值
 *
 * 回合流程：
 *   startNewTurn()
 *     ├─ 怪物摸牌 + 计算意图（本回合贪心选牌）
 *     ├─ 英雄摸牌 + 恢复行动值 + 清空护盾
 *     └─ 更新UI
 *   玩家出牌（可多次）
 *   endPlayerTurn()
 *     ├─ 怪物执行意图（打出预告的牌）
 *     ├─ 怪物护盾清空
 *     └─ startNewTurn()
 */

import {
  state, addMessage,
  damagePlayer, damageMonster, healPlayer,
  drawCards, discardHand, shuffle,
} from './state.js';
import { REWARD_CARD_POOL } from './data.js';
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

  const { battle } = state;
  battle.monster = monster;
  battle.turn    = 0;
  battle.log     = [];

  // ── 英雄战斗状态重置 ──
  state.player.shield = 0;
  battle.hero.ap        = 0;
  battle.hero.turnApMax = 0;

  // ── 怪物战斗状态重置 ──
  const en = battle.enemy;
  en.ap          = 0;
  en.turnApMax   = 0;
  en.hand        = [];
  en.discardPile = [];
  en.intent      = [];
  en.drawPile    = shuffle([...monster.deck]);

  // ── 英雄牌组重置 ──
  const { deck } = state;
  deck.drawPile    = shuffle([...deck.allCards]);
  deck.hand        = [];
  deck.discardPile = [];

  showBattleScreen();
  battleLog(`⚔️ 遭遇 ${monster.name}！战斗开始！`);

  // 第一回合
  startNewTurn();
}

// ─────────────────────────────────────────────────────────────────────────────
// 开启新回合
// ─────────────────────────────────────────────────────────────────────────────

function startNewTurn() {
  const { battle, player } = state;
  battle.turn++;

  const turn = battle.turn;

  // ── 1. 怪物摸牌 & 决定意图 ──────────────────────────────────────────
  const en = battle.enemy;
  const monster = battle.monster;

  // 怪物本回合行动值
  en.turnApMax = Math.min(turn, monster.maxAp);
  en.ap        = en.turnApMax;

  // 怪物弃掉上回合剩余手牌
  en.discardPile.push(...en.hand);
  en.hand = [];

  // 怪物摸牌
  for (let i = 0; i < monster.handSize; i++) {
    if (en.drawPile.length === 0) {
      if (en.discardPile.length === 0) break;
      en.drawPile    = shuffle(en.discardPile);
      en.discardPile = [];
    }
    en.hand.push(en.drawPile.pop());
  }

  // 怪物贪心决定意图（本回合最优出牌序列）
  en.intent = calcMonsterIntent(en.hand, en.ap);

  // ── 2. 英雄状态更新 ───────────────────────────────────────────────────
  player.shield = 0;   // 护盾每回合清零

  const hero = battle.hero;
  hero.turnApMax = Math.min(turn, player.maxAp);
  hero.ap        = hero.turnApMax;

  // 弃掉旧手牌，重新摸牌
  discardHand();
  drawCards(player.handSize);

  battleLog(`── 第 ${turn} 回合 ── 行动值 ${hero.ap}/${hero.turnApMax}`);
  updateBattleUI();
}

/**
 * 贪心计算怪物意图：从高费到低费，尽量花完行动值
 * @returns {Array} 将打出的牌序列
 */
function calcMonsterIntent(hand, availableAp) {
  const sorted = [...hand].sort((a, b) => b.cost - a.cost);
  const intent = [];
  let ap = availableAp;
  for (const card of sorted) {
    if (card.cost <= ap) {
      intent.push(card);
      ap -= card.cost;
    }
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

  if (state.battle.hero.ap < card.cost) {
    battleLog('⚡ 行动值不足！');
    return;
  }

  // 消耗行动值
  state.battle.hero.ap -= card.cost;

  // 移出手牌 → 弃牌
  state.deck.hand.splice(handIndex, 1);
  state.deck.discardPile.push(card);

  // 执行效果
  executeHeroCard(card);

  // 检查怪物是否死亡
  if (state.battle.monster.hp <= 0) {
    endBattle(true);
    return;
  }

  updateBattleUI();
}

function executeHeroCard(card) {
  const monster = state.battle.monster;
  if (card.type === 'attack') {
    const hits = card.hits || 1;
    for (let i = 0; i < hits; i++) damageMonster(monster, card.value);
    const total = card.value * hits;
    battleLog(`🗡 打出【${card.name}】→ 对 ${monster.name} 造成 ${total} 点伤害`
      + (hits > 1 ? `（${card.value}×${hits}）` : ''));
  } else if (card.type === 'skill') {
    if (card.isHeal) {
      healPlayer(card.value);
      battleLog(`💊 打出【${card.name}】→ 恢复 ${card.value} 点生命`);
    } else if (card.counterDmg) {
      state.player.shield += card.value;
      damageMonster(monster, card.counterDmg);
      battleLog(`🛡 打出【${card.name}】→ 获得 ${card.value} 护盾，反弹 ${card.counterDmg} 伤害`);
    } else if (card.draw) {
      state.player.shield += card.value;
      drawCards(card.draw);
      battleLog(`🛡 打出【${card.name}】→ 获得 ${card.value} 护盾，摸 ${card.draw} 张牌`);
    } else {
      state.player.shield += card.value;
      battleLog(`🛡 打出【${card.name}】→ 获得 ${card.value} 点护盾`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 英雄结束回合 → 怪物行动
// ─────────────────────────────────────────────────────────────────────────────

export function endPlayerTurn() {
  if (state.phase !== 'battle') return;

  battleLog('── 玩家回合结束，轮到怪物 ──');

  // 怪物清盾、执行意图
  const monster = state.battle.monster;
  monster.shield = (monster.shield || 0);
  // 护盾在结算前也清零（对称规则）
  monster.shield = 0;

  const en = battle_();
  for (const card of en.intent) {
    executeMonsterCard(card, monster);
    if (state.player.hp <= 0) {
      // 玩家死亡，不继续执行后续牌
      showGameOver();
      return;
    }
  }
  en.intent = [];  // 意图已执行

  // 开启下一回合
  startNewTurn();
}

function executeMonsterCard(card, monster) {
  if (card.type === 'attack') {
    const hits = card.hits || 1;
    let totalDmg = 0;
    for (let i = 0; i < hits; i++) {
      const real = damagePlayer(card.value);
      totalDmg += real;
    }
    const raw = card.value * hits;
    battleLog(`👾 ${monster.name} 打出【${card.name}】→ 对英雄造成 ${raw} 点伤害（实际 ${totalDmg}）`);
  } else if (card.type === 'skill') {
    monster.shield = (monster.shield || 0) + card.value;
    battleLog(`👾 ${monster.name} 打出【${card.name}】→ 获得 ${card.value} 点护盾`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 战斗结束
// ─────────────────────────────────────────────────────────────────────────────

function endBattle(playerWon) {
  if (!playerWon) return;

  const monster = state.battle.monster;
  battleLog(`🎉 击败了 ${monster.name}！`);

  // 从地图移除怪物
  const idx = state.monsters.indexOf(monster);
  if (idx !== -1) state.monsters.splice(idx, 1);

  // 随机奖励一张新卡
  const reward = REWARD_CARD_POOL[Math.floor(Math.random() * REWARD_CARD_POOL.length)];
  state.deck.allCards.push(reward);
  addMessage(`🏆 战斗胜利！获得新卡：【${reward.name}】`);

  // 清理战斗状态
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
// 弹窗
// ─────────────────────────────────────────────────────────────────────────────

function showVictoryOverlay(card) {
  const overlay  = document.getElementById('overlay');
  document.getElementById('overlay-title').textContent = '🎉 战斗胜利！';
  document.getElementById('overlay-msg').innerHTML = `
    获得奖励卡牌：
    <div class="reward-card card card-${card.type}" style="margin:12px auto;cursor:default">
      <div class="card-name">${card.name}</div>
      <div class="card-desc">${card.desc}</div>
      <div class="card-cost">⚡ ${card.cost}</div>
    </div>`;
  const btn = document.getElementById('overlay-btn');
  btn.textContent = '继续探索';
  btn.onclick = () => overlay.classList.add('hidden');
  overlay.classList.remove('hidden');
}

function showGameOver() {
  hideBattleScreen();
  state.phase = 'gameover';
  document.getElementById('overlay-title').textContent = '💀 游戏结束';
  document.getElementById('overlay-msg').textContent   = '你在战斗中倒下了……';
  const btn = document.getElementById('overlay-btn');
  btn.textContent = '重新开始';
  btn.onclick = () => location.reload();
  document.getElementById('overlay').classList.remove('hidden');
}

// ─────────────────────────────────────────────────────────────────────────────
// 工具
// ─────────────────────────────────────────────────────────────────────────────

function battleLog(msg) {
  state.battle.log.push(msg);
  if (state.battle.log.length > 30) state.battle.log.shift();
  addMessage(msg);
}

// 简写 getter，避免每次写 state.battle.enemy
function battle_() { return state.battle.enemy; }
