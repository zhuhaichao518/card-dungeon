/**
 * ui.js - UI更新
 * 血条、背包、消息日志、战斗界面渲染
 */

import { state } from './state.js';
import { playCard, endPlayerTurn } from './battle.js';

/* ────────────────────────────────────────
   探索界面 UI
──────────────────────────────────────── */

/**
 * 更新探索界面所有UI元素
 */
export function updateExploreUI() {
  updatePlayerHpBar();
  updateInventory();
  updateMessageLog();
  updateFloorLabel();
}

/** 更新玩家血条 */
function updatePlayerHpBar() {
  const hp = state.player.hp;
  const maxHp = state.player.maxHp;
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));

  const bar = document.getElementById('hp-bar-fill');
  const text = document.getElementById('hp-text');
  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = `${hp} / ${maxHp}`;
}

/** 更新背包（钥匙数量） */
function updateInventory() {
  const keyY = document.getElementById('key-yellow-count');
  const keyB = document.getElementById('key-blue-count');
  const keyR = document.getElementById('key-red-count');
  if (keyY) keyY.textContent = state.inventory.keyYellow;
  if (keyB) keyB.textContent = state.inventory.keyBlue;
  if (keyR) keyR.textContent = state.inventory.keyRed;
}

/** 更新消息日志 */
function updateMessageLog() {
  const log = document.getElementById('message-log');
  if (!log) return;
  log.innerHTML = '';
  // 最新消息在下方
  state.messages.forEach(msg => {
    const p = document.createElement('p');
    p.textContent = msg;
    log.appendChild(p);
  });
  log.scrollTop = log.scrollHeight;
}

/** 更新楼层标签 */
function updateFloorLabel() {
  const el = document.getElementById('floor-label');
  if (el) el.textContent = `第 ${state.floor} 层`;
}

/* ────────────────────────────────────────
   战斗界面 UI
──────────────────────────────────────── */

/**
 * 显示战斗界面（隐藏探索面板）
 */
export function showBattleScreen() {
  document.getElementById('explore-screen').classList.add('hidden');
  document.getElementById('battle-screen').classList.remove('hidden');
}

/**
 * 隐藏战斗界面（显示探索面板）
 */
export function hideBattleScreen() {
  document.getElementById('battle-screen').classList.add('hidden');
  document.getElementById('explore-screen').classList.remove('hidden');
}

/**
 * 更新战斗界面所有元素
 */
export function updateBattleUI() {
  updateBattleHero();
  updateBattleMonster();
  updateBattleEnergy();
  updateBattleHand();
  updateBattleLog();
}

/** 更新英雄状态 */
function updateBattleHero() {
  const { hp, maxHp, shield } = state.player;
  const pct = Math.max(0, (hp / maxHp) * 100);

  const bar = document.getElementById('battle-hero-hp-bar');
  const text = document.getElementById('battle-hero-hp-text');
  const shieldEl = document.getElementById('battle-hero-shield');

  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = `${hp} / ${maxHp}`;
  if (shieldEl) shieldEl.textContent = shield;
}

/** 更新怪物状态 */
function updateBattleMonster() {
  const monster = state.battle.monster;
  if (!monster) return;

  const { hp, maxHp } = monster;
  const pct = Math.max(0, (hp / maxHp) * 100);

  const nameEl = document.getElementById('battle-monster-name');
  const bar = document.getElementById('battle-monster-hp-bar');
  const text = document.getElementById('battle-monster-hp-text');
  const intentEl = document.getElementById('battle-monster-intent');

  if (nameEl) nameEl.textContent = `${monster.emoji} ${monster.name}`;
  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = `${hp} / ${maxHp}`;

  // 显示怪物意图
  if (intentEl && state.battle.monsterIntent) {
    const intent = state.battle.monsterIntent;
    let intentText = intent.label;
    // 如果是蓄力，显示警告信息
    if (intent.chargeMsg) {
      intentText = `⚠️ ${intent.chargeMsg} → ${intent.label}`;
    }
    intentEl.textContent = `💭 下回合: ${intentText}`;
  }
}

/** 更新能量显示 */
function updateBattleEnergy() {
  const { energy, maxEnergy } = state.player;
  const container = document.getElementById('energy-display');
  const textEl = document.getElementById('energy-text');

  if (container) {
    container.innerHTML = '';
    for (let i = 0; i < maxEnergy; i++) {
      const gem = document.createElement('span');
      gem.classList.add('energy-gem');
      gem.classList.toggle('empty', i >= energy);
      gem.textContent = '⚡';
      container.appendChild(gem);
    }
  }
  if (textEl) textEl.textContent = `${energy} / ${maxEnergy}`;
}

/** 更新手牌显示 */
function updateBattleHand() {
  const handEl = document.getElementById('battle-hand');
  if (!handEl) return;

  handEl.innerHTML = '';
  const { energy } = state.player;

  state.deck.hand.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card', `card-${card.type}`);
    if (card.cost > energy) cardEl.classList.add('card-disabled');

    cardEl.innerHTML = `
      <div class="card-name">${card.name}</div>
      <div class="card-desc">${card.desc}</div>
      <div class="card-cost">⚡${card.cost}</div>
    `;

    // 点击出牌
    if (card.cost <= energy) {
      cardEl.addEventListener('click', () => playCard(idx));
    }

    handEl.appendChild(cardEl);
  });
}

/** 更新战斗日志 */
function updateBattleLog() {
  const logEl = document.getElementById('battle-log');
  if (!logEl) return;

  logEl.innerHTML = '';
  const logs = state.battle.log.slice(-8); // 显示最近8条
  logs.forEach(msg => {
    const p = document.createElement('p');
    p.textContent = msg;
    logEl.appendChild(p);
  });
  logEl.scrollTop = logEl.scrollHeight;
}

/**
 * 绑定"结束回合"按钮
 */
export function bindEndTurnButton() {
  const btn = document.getElementById('end-turn-btn');
  if (btn) {
    btn.addEventListener('click', endPlayerTurn);
  }
}
