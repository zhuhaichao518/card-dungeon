/**
 * battle.js - 卡牌战斗系统
 * 管理战斗流程：开始战斗、出牌、结束回合、怪物行动、战斗结束
 */

import {
  state,
  addMessage,
  damagePlayer,
  damageMonster,
  healPlayer,
  drawCards,
  discardHand,
  shuffle,
} from './state.js';
import { REWARD_CARD_POOL } from './data.js';
import { renderMap } from './renderer.js';
import { updateBattleUI, updateExploreUI, showBattleScreen, hideBattleScreen } from './ui.js';

/**
 * 开始与某个怪物的战斗
 * @param {object} monster
 */
export function startBattle(monster) {
  state.phase = 'battle';
  state.battle.monster = monster;
  state.battle.turn = 1;
  state.battle.log = [];

  // 重置玩家护盾和能量
  state.player.shield = 0;
  state.player.energy = state.player.maxEnergy;

  // 重置牌堆：把全部卡牌洗入待抽堆
  const { deck } = state;
  deck.drawPile = shuffle([...deck.allCards]);
  deck.hand = [];
  deck.discardPile = [];

  // 抽初始手牌
  drawCards(state.player.handSize || 5);

  // 计算怪物第一个意图
  updateMonsterIntent();

  // 切换到战斗界面
  showBattleScreen();
  updateBattleUI();

  battleLog(`战斗开始！对战 ${monster.name}`);
}

/**
 * 玩家打出一张手牌
 * @param {number} handIndex - 手牌索引
 */
export function playCard(handIndex) {
  if (state.phase !== 'battle') return;

  const card = state.deck.hand[handIndex];
  if (!card) return;

  // 检查能量
  if (state.player.energy < card.cost) {
    battleLog('能量不足，无法打出此牌！');
    return;
  }

  // 消耗能量
  state.player.energy -= card.cost;

  // 从手牌中移除
  state.deck.hand.splice(handIndex, 1);

  // 放入弃牌堆
  state.deck.discardPile.push(card);

  // 执行卡牌效果
  executeCardEffect(card);

  // 检查怪物是否死亡
  if (state.battle.monster.hp <= 0) {
    endBattle(true);
    return;
  }

  updateBattleUI();
}

/**
 * 执行卡牌效果
 * @param {object} card
 */
function executeCardEffect(card) {
  const monster = state.battle.monster;

  if (card.type === 'attack') {
    const hits = card.hits || 1;
    let totalDmg = 0;
    for (let i = 0; i < hits; i++) {
      damageMonster(monster, card.value);
      totalDmg += card.value;
    }
    if (hits > 1) {
      battleLog(`打出【${card.name}】：造成 ${card.value}×${hits}=${totalDmg} 点伤害`);
    } else {
      battleLog(`打出【${card.name}】：造成 ${totalDmg} 点伤害`);
    }
  } else if (card.type === 'skill') {
    if (card.isHeal) {
      healPlayer(card.value);
      battleLog(`打出【${card.name}】：恢复 ${card.value} 点生命`);
    } else {
      // 护盾技能
      state.player.shield += card.value;
      battleLog(`打出【${card.name}】：获得 ${card.value} 点护盾`);
    }
  }
}

/**
 * 玩家结束回合
 */
export function endPlayerTurn() {
  if (state.phase !== 'battle') return;

  battleLog('--- 玩家结束回合 ---');

  // 怪物行动
  monsterAct();

  // 检查玩家是否死亡
  if (state.player.hp <= 0) {
    state.phase = 'gameover';
    showGameOverFromBattle();
    return;
  }

  // 开始下一个玩家回合
  startPlayerTurn();
}

/**
 * 怪物行动
 */
function monsterAct() {
  const monster = state.battle.monster;
  const pattern = monster.actionPattern;
  const action = pattern[monster.actionIndex % pattern.length];

  if (action.type === 'attack' || action.type === 'power') {
    const realDmg = damagePlayer(action.value);
    battleLog(`${monster.name} 攻击！造成 ${action.value} 点伤害（实际伤害 ${realDmg}，护盾抵消 ${action.value - realDmg}）`);
  }

  // 推进怪物行动索引
  monster.actionIndex = (monster.actionIndex + 1) % pattern.length;
}

/**
 * 开始新的玩家回合
 */
function startPlayerTurn() {
  state.battle.turn++;

  // 护盾清零
  state.player.shield = 0;

  // 恢复能量
  state.player.energy = state.player.maxEnergy;

  // 弃掉剩余手牌，重新抽牌
  discardHand();
  drawCards(state.player.handSize || 5);

  // 更新怪物意图（显示本回合将要做什么）
  updateMonsterIntent();

  battleLog(`--- 第 ${state.battle.turn} 回合 ---`);
  updateBattleUI();
}

/**
 * 计算并更新怪物当前意图（预告下回合行动）
 */
function updateMonsterIntent() {
  const monster = state.battle.monster;
  const pattern = monster.actionPattern;
  const nextAction = pattern[monster.actionIndex % pattern.length];
  state.battle.monsterIntent = nextAction;
}

/**
 * 战斗结束
 * @param {boolean} playerWon
 */
function endBattle(playerWon) {
  if (playerWon) {
    const monster = state.battle.monster;
    battleLog(`击败了 ${monster.name}！`);

    // 从怪物列表中移除
    const idx = state.monsters.indexOf(monster);
    if (idx !== -1) state.monsters.splice(idx, 1);

    // 显示奖励（随机一张新卡）
    const rewardCard = REWARD_CARD_POOL[Math.floor(Math.random() * REWARD_CARD_POOL.length)];
    state.deck.allCards.push(rewardCard);
    addMessage(`战斗胜利！获得新卡：【${rewardCard.name}】`);

    // 切换回探索阶段
    state.phase = 'explore';

    // 清空战斗状态
    discardHand();
    state.battle.monster = null;
    state.battle.log = [];

    // 隐藏战斗界面
    hideBattleScreen();
    renderMap();
    updateExploreUI();

    // 显示奖励弹窗
    showVictoryOverlay(rewardCard);
  }
}

/**
 * 显示胜利奖励弹窗
 * @param {object} rewardCard
 */
function showVictoryOverlay(rewardCard) {
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayMsg = document.getElementById('overlay-msg');
  const overlayBtn = document.getElementById('overlay-btn');

  overlayTitle.textContent = '🎉 战斗胜利！';
  overlayMsg.innerHTML = `
    获得奖励卡牌：<br>
    <div class="reward-card card card-${rewardCard.type}">
      <div class="card-name">${rewardCard.name}</div>
      <div class="card-desc">${rewardCard.desc}</div>
      <div class="card-cost">⚡${rewardCard.cost}</div>
    </div>
  `;
  overlayBtn.textContent = '继续探索';
  overlayBtn.onclick = () => {
    overlay.classList.add('hidden');
  };

  overlay.classList.remove('hidden');
}

/**
 * 战斗中玩家死亡
 */
function showGameOverFromBattle() {
  hideBattleScreen();
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayMsg = document.getElementById('overlay-msg');
  const overlayBtn = document.getElementById('overlay-btn');

  overlayTitle.textContent = '💀 游戏结束';
  overlayMsg.textContent = '你在战斗中被击倒了……';
  overlayBtn.textContent = '重新开始';
  overlayBtn.onclick = () => location.reload();

  overlay.classList.remove('hidden');
}

/**
 * 添加战斗日志
 * @param {string} msg
 */
function battleLog(msg) {
  state.battle.log.push(msg);
  if (state.battle.log.length > 20) state.battle.log.shift();
  // 同步到探索消息（战斗中）
  addMessage(msg);
}
