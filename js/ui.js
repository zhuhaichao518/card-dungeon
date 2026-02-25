/**
 * ui.js - UI 渲染
 * 支持行动值水晶成长系统 + 怪物意图卡牌展示
 */

import { state } from './state.js';
import { playCard, endPlayerTurn } from './battle.js';

// ═══════════════════════════════════════════════
// 探索界面
// ═══════════════════════════════════════════════

export function updateExploreUI() {
  updatePlayerHpBar();
  updateInventory();
  updateMessageLog();
  updateFloorLabel();
}

function updatePlayerHpBar() {
  const { hp, maxHp } = state.player;
  const pct = Math.max(0, (hp / maxHp) * 100);
  const fill = document.getElementById('hp-bar-fill');
  const text = document.getElementById('hp-text');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = `${hp} / ${maxHp}`;
}

function updateInventory() {
  setInner('key-yellow-count', state.inventory.keyYellow);
  setInner('key-blue-count',   state.inventory.keyBlue);
  setInner('key-red-count',    state.inventory.keyRed);
}

function updateMessageLog() {
  const log = document.getElementById('message-log');
  if (!log) return;
  log.innerHTML = '';
  state.messages.forEach(msg => {
    const p = document.createElement('p');
    p.textContent = msg;
    log.appendChild(p);
  });
  log.scrollTop = log.scrollHeight;
}

function updateFloorLabel() {
  setInner('floor-label', `第 ${state.floor} 层`);
}

// ═══════════════════════════════════════════════
// 战斗界面切换
// ═══════════════════════════════════════════════

export function showBattleScreen() {
  document.getElementById('explore-screen').classList.add('hidden');
  document.getElementById('battle-screen').classList.remove('hidden');
}

export function hideBattleScreen() {
  document.getElementById('battle-screen').classList.add('hidden');
  document.getElementById('explore-screen').classList.remove('hidden');
}

// ═══════════════════════════════════════════════
// 战斗界面 - 完整刷新
// ═══════════════════════════════════════════════

export function updateBattleUI() {
  renderHero();
  renderMonster();
  renderApCrystals();
  renderHeroHand();
  renderBattleLog();
  renderMonsterIntent();
  renderTurnLabel();
}

// ── 英雄面板 ─────────────────────────────────

function renderHero() {
  const { hp, maxHp, shield } = state.player;
  const pct = Math.max(0, (hp / maxHp) * 100);
  const fill = document.getElementById('battle-hero-hp-bar');
  if (fill) fill.style.width = pct + '%';
  setInner('battle-hero-hp-text', `${hp} / ${maxHp}`);
  setInner('battle-hero-shield',  shield);
}

// ── 怪物面板 ─────────────────────────────────

function renderMonster() {
  const m = state.battle.monster;
  if (!m) return;
  const { hp, maxHp } = m;
  const pct = Math.max(0, (hp / maxHp) * 100);
  const fill = document.getElementById('battle-monster-hp-bar');
  if (fill) fill.style.width = pct + '%';
  setInner('battle-monster-name',    `${m.emoji} ${m.name}`);
  setInner('battle-monster-hp-text', `${hp} / ${maxHp}`);

  // 怪物护盾
  const mShield = m.shield || 0;
  setInner('battle-monster-shield', mShield);

  // 怪物行动值水晶（显示本回合能用多少）
  renderApCrystalsFor(
    'monster-ap-display',
    state.battle.enemy.ap,
    state.battle.enemy.turnApMax,
    m.maxAp,
    'enemy'
  );
}

// ── 英雄行动值水晶 ────────────────────────────
// 行动值格子分3种状态：
//   available (◆ 亮色) = 本回合剩余可用
//   spent     (◆ 暗色) = 本回合已消耗
//   locked    (◇ 极暗) = 超出本回合上限（下回合才有）

function renderApCrystals() {
  const hero = state.battle.hero;
  renderApCrystalsFor(
    'ap-display',
    hero.ap,
    hero.turnApMax,
    state.player.maxAp,
    'hero'
  );
  setInner('ap-text', `${hero.ap} / ${hero.turnApMax}`);

  // 同步更新顶栏HP
  updatePlayerHpBar();
}

/**
 * 渲染行动值水晶到指定容器
 * @param {string} containerId
 * @param {number} ap       - 当前剩余
 * @param {number} turnMax  - 本回合上限
 * @param {number} globalMax- 最大上限
 * @param {string} who      - 'hero' | 'enemy'
 */
function renderApCrystalsFor(containerId, ap, turnMax, globalMax, who) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  for (let i = 0; i < globalMax; i++) {
    const gem = document.createElement('span');
    gem.classList.add('ap-gem');
    if (i < ap) {
      gem.classList.add('ap-available');
      gem.title = '可用行动值';
    } else if (i < turnMax) {
      gem.classList.add('ap-spent');
      gem.title = '已消耗';
    } else {
      gem.classList.add('ap-locked');
      gem.title = '下回合解锁';
    }
    c.appendChild(gem);
  }
}

// ── 英雄手牌 ─────────────────────────────────

function renderHeroHand() {
  const handEl = document.getElementById('battle-hand');
  if (!handEl) return;
  handEl.innerHTML = '';
  const ap = state.battle.hero.ap;

  state.deck.hand.forEach((card, idx) => {
    const el = buildCardEl(card, idx, ap, 'hero');
    handEl.appendChild(el);
  });
}

// ── 怪物意图 ─────────────────────────────────
// 展示怪物本回合将打出的牌（贪心决定，回合开始时固定）

function renderMonsterIntent() {
  const intentEl = document.getElementById('battle-monster-intent');
  if (!intentEl) return;
  const intent = state.battle.enemy.intent;
  if (!intent || intent.length === 0) {
    intentEl.innerHTML = '<span style="color:#555">（无行动）</span>';
    return;
  }
  intentEl.innerHTML = '';

  // 文字标签
  const label = document.createElement('span');
  label.className = 'intent-label';
  label.textContent = '意图：';
  intentEl.appendChild(label);

  // 每张意图牌显示为小卡片
  intent.forEach(card => {
    const mini = document.createElement('div');
    mini.className = `intent-card intent-card-${card.type}`;
    mini.innerHTML = `
      <span class="intent-card-name">${card.name}</span>
      <span class="intent-card-cost">⚡${card.cost}</span>
    `;
    mini.title = card.desc;
    intentEl.appendChild(mini);
  });
}

// ── 战斗日志 ─────────────────────────────────

function renderBattleLog() {
  const el = document.getElementById('battle-log');
  if (!el) return;
  el.innerHTML = '';
  state.battle.log.slice(-10).forEach(msg => {
    const p = document.createElement('p');
    p.textContent = msg;
    el.appendChild(p);
  });
  el.scrollTop = el.scrollHeight;
}

// ─────────────────────────────────────────────
// 卡牌 DOM 构建（英雄手牌）
// ─────────────────────────────────────────────

function buildCardEl(card, idx, currentAp, owner) {
  const el = document.createElement('div');
  el.classList.add('card', `card-${card.type}`);
  const canPlay = currentAp >= card.cost;
  if (!canPlay) el.classList.add('card-disabled');

  el.innerHTML = `
    <div class="card-cost-badge ap-badge-${card.type}">⚡${card.cost}</div>
    <div class="card-name">${card.name}</div>
    <div class="card-desc">${card.desc}</div>
  `;

  if (canPlay && owner === 'hero') {
    el.addEventListener('click', () => playCard(idx));
    el.addEventListener('mouseenter', () => el.classList.add('card-hover'));
    el.addEventListener('mouseleave', () => el.classList.remove('card-hover'));
  }
  return el;
}

function renderTurnLabel() {
  const el = document.getElementById('battle-turn-label');
  if (el) el.textContent = `回合 ${state.battle.turn}`;
}

// ─────────────────────────────────────────────
// 结束回合按钮绑定
// ─────────────────────────────────────────────

export function bindEndTurnButton() {
  const btn = document.getElementById('end-turn-btn');
  if (btn) btn.addEventListener('click', endPlayerTurn);
}

// ─────────────────────────────────────────────
// 工具
// ─────────────────────────────────────────────

function setInner(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
