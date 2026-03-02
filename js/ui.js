/**
 * ui.js - UI 渲染（支持状态效果展示）
 */

import { state } from './state.js';
import { playCard, endPlayerTurn } from './battle.js';
import { MONSTER_SPRITE, getSprite } from './sprites.js';
import { MONSTER_DEFS } from './data.js';

// ═══════════════════════════════════════
// 探索界面
// ═══════════════════════════════════════

export function updateExploreUI() {
  updateHpBar('hp-bar-fill', 'hp-text', state.player.hp, state.player.maxHp);
  updateInventory();
  updateMessageLog();
  setInner('floor-label', `第 ${state.floor} / 50 层`);
  setInner('explore-atk', state.player.atk ?? 5);
  setInner('explore-def', state.player.def ?? 3);
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

// ═══════════════════════════════════════
// 战斗界面切换
// ═══════════════════════════════════════

export function showBattleScreen() {
  document.getElementById('explore-screen').classList.add('hidden');
  document.getElementById('battle-screen').classList.remove('hidden');
}

export function hideBattleScreen() {
  document.getElementById('battle-screen').classList.add('hidden');
  document.getElementById('explore-screen').classList.remove('hidden');
}

// ═══════════════════════════════════════
// 战斗界面完整刷新
// ═══════════════════════════════════════

export function updateBattleUI() {
  renderHeroPanel();
  renderMonsterPanel();
  renderHeroAp();
  renderHeroHand();
  renderBattleLog();
  renderTurnLabel();
}

// ── 英雄面板 ────────────────────────────

function renderHeroPanel() {
  const { hp, maxHp, shield, effects, atk, def } = state.player;
  updateHpBar('battle-hero-hp-bar', 'battle-hero-hp-text', hp, maxHp, true);
  setInner('battle-hero-shield', shield);
  setInner('battle-hero-atk', atk ?? 0);
  setInner('battle-hero-def', def ?? 0);
  renderEffects('battle-hero-effects', effects);
}

// ── 怪物面板 ────────────────────────────

function renderMonsterPanel() {
  const m = state.battle.monster;
  if (!m) return;
  setInner('battle-monster-name', m.name);

  // 绘制怪物精灵到小canvas
  const spriteCanvas = document.getElementById('battle-monster-sprite');
  if (spriteCanvas) {
    const sctx = spriteCanvas.getContext('2d');
    sctx.clearRect(0, 0, 32, 32);
    sctx.imageSmoothingEnabled = false;
    const key = m.defId || m.id;
    const sp  = MONSTER_SPRITE[key] || MONSTER_SPRITE.default;
    const img = getSprite(sp.sheet);
    if (img) sctx.drawImage(img, sp.srcX, sp.srcY, sp.srcW, sp.srcH, 0, 0, 32, 32);
  }
  updateHpBar('battle-monster-hp-bar', 'battle-monster-hp-text', m.hp, m.maxHp, false);
  setInner('battle-monster-shield', m.shield || 0);
  setInner('battle-monster-atk', m.atk ?? 0);
  setInner('battle-monster-def', m.def ?? 0);
  renderEffects('battle-monster-effects', m.effects || {});

  renderApCrystalsFor('monster-ap-display',
    state.battle.enemy.ap, state.battle.enemy.turnApMax, m.maxAp);
  renderMonsterIntent();
}

// ── 状态效果图标 ─────────────────────────

const EFFECT_CONFIG = {
  poison:   { icon:'☠️', color:'#76ff03', label:'中毒' },
  burn:     { icon:'🔥', color:'#ff6d00', label:'灼烧' },
  weakness: { icon:'💔', color:'#ef5350', label:'虚弱' },
  strength: { icon:'💪', color:'#ffeb3b', label:'强化' },
};

function renderEffects(containerId, effects) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  for (const [key, val] of Object.entries(effects || {})) {
    if (!val || val <= 0) continue;
    const cfg = EFFECT_CONFIG[key];
    if (!cfg) continue;
    const badge = document.createElement('span');
    badge.className = 'effect-badge';
    badge.style.color = cfg.color;
    badge.title = `${cfg.label}: ${val}`;
    badge.textContent = `${cfg.icon}${val}`;
    c.appendChild(badge);
  }
}

// ── 英雄行动值 ───────────────────────────

function renderHeroAp() {
  const h = state.battle.hero;
  renderApCrystalsFor('ap-display', h.ap, h.turnApMax, state.player.maxAp);
  setInner('ap-text', `${h.ap} / ${h.turnApMax}`);
  // 同步顶栏HP
  updateHpBar('hp-bar-fill', 'hp-text', state.player.hp, state.player.maxHp);
}

function renderApCrystalsFor(id, ap, turnMax, globalMax) {
  const c = document.getElementById(id);
  if (!c) return;
  c.innerHTML = '';
  for (let i = 0; i < globalMax; i++) {
    const gem = document.createElement('span');
    gem.className = 'ap-gem ' + (i < ap ? 'ap-available' : i < turnMax ? 'ap-spent' : 'ap-locked');
    c.appendChild(gem);
  }
}

// ── 手牌 ────────────────────────────────

function renderHeroHand() {
  const handEl = document.getElementById('battle-hand');
  if (!handEl) return;
  handEl.innerHTML = '';
  const ap = state.battle.hero.ap;
  state.deck.hand.forEach((card, idx) => {
    const el = buildCardEl(card, idx, ap);
    // 摸牌动画：新摸的牌加入动画类，动画结束后移除标记
    if (card._isNew) {
      el.classList.add('card-draw-anim');
      el.addEventListener('animationend', () => {
        el.classList.remove('card-draw-anim');
        card._isNew = false;
      }, { once: true });
    }
    handEl.appendChild(el);
  });
}

// ── 怪物意图 ────────────────────────────

function renderMonsterIntent() {
  const intentEl = document.getElementById('battle-monster-intent');
  if (!intentEl) return;
  const intent = state.battle.enemy.intent || [];
  if (intent.length === 0) {
    intentEl.innerHTML = '<span class="no-intent">（无行动）</span>';
    return;
  }
  intentEl.innerHTML = '<span class="intent-label">意图：</span>';
  intent.forEach(card => {
    const mini = document.createElement('div');
    mini.className = `intent-card intent-card-${card.type}`;
    mini.innerHTML = `<span class="intent-card-name">${card.name}</span><span class="intent-card-cost">⚡${card.cost}</span>`;

    // ── Tooltip（鼠标 + 触控）──────────────────────────────
    const showTip = (e) => {
      const tip = document.getElementById('intent-tooltip');
      document.getElementById('intent-tooltip-name').textContent = card.name;
      document.getElementById('intent-tooltip-desc').textContent = card.desc;
      document.getElementById('intent-tooltip-cost').textContent = `⚡ 费用 ${card.cost}`;
      tip.classList.remove('hidden');

      // 定位到元素上方
      const rect = mini.getBoundingClientRect();
      tip.style.left = Math.min(rect.left, window.innerWidth - 180) + 'px';
      tip.style.top  = (rect.top - tip.offsetHeight - 8) + 'px';

      // 如果上方空间不够，显示在下方
      if (rect.top - tip.offsetHeight - 8 < 4) {
        tip.style.top = (rect.bottom + 6) + 'px';
      }
    };
    const hideTip = () => {
      document.getElementById('intent-tooltip')?.classList.add('hidden');
    };

    mini.addEventListener('mouseenter', showTip);
    mini.addEventListener('mouseleave', hideTip);
    mini.addEventListener('touchstart', (e) => { e.preventDefault(); showTip(e); }, { passive: false });
    mini.addEventListener('touchend',   hideTip);

    intentEl.appendChild(mini);
  });
}

// ── 战斗日志 ────────────────────────────

function renderBattleLog() {
  const el = document.getElementById('battle-log');
  if (!el) return;
  el.innerHTML = '';
  state.battle.log.slice(-12).forEach(msg => {
    const p = document.createElement('p');
    p.textContent = msg;
    el.appendChild(p);
  });
  el.scrollTop = el.scrollHeight;
}

function renderTurnLabel() {
  setInner('battle-turn-label', `⚔️ 回合 ${state.battle.turn}`);
}

// ═══════════════════════════════════════
// 卡牌DOM构建
// ═══════════════════════════════════════

function buildCardEl(card, idx, ap) {
  const el = document.createElement('div');
  el.classList.add('card', `card-${card.type}`);
  const canPlay = ap >= card.cost;
  if (!canPlay) el.classList.add('card-disabled');

  // 稀有度提示颜色
  const rarity = card.rarity || 'common';
  el.classList.add(`card-rarity-${rarity}`);

  el.innerHTML = `
    <div class="card-cost-badge ap-badge-${card.type}">⚡${card.cost}</div>
    <div class="card-name">${card.name}</div>
    <div class="card-desc">${card.desc}</div>
  `;
  if (canPlay) {
    el.addEventListener('click', () => playCard(idx));
  }
  return el;
}

// ═══════════════════════════════════════
// 通关界面
// ═══════════════════════════════════════

export function showVictoryScreen() {
  const ov = document.getElementById('overlay');
  document.getElementById('overlay-title').textContent = '🎊 恭喜通关！';
  document.getElementById('overlay-msg').innerHTML = `
    <p>你战胜了龙神，征服了20层地牢！</p>
    <p style="color:#aaa;font-size:.8rem;margin-top:8px">
      HP: ${state.player.hp} / ${state.player.maxHp}<br>
      牌组: ${state.deck.allCards.length} 张
    </p>`;
  const btn = document.getElementById('overlay-btn');
  btn.textContent = '🔄 再次挑战';
  btn.onclick = () => location.reload();
  ov.classList.remove('hidden');
}

// ═══════════════════════════════════════
// 绑定结束回合
// ═══════════════════════════════════════

export function bindEndTurnButton() {
  document.getElementById('end-turn-btn')?.addEventListener('click', endPlayerTurn);
}

// ═══════════════════════════════════════
// 查看卡组
// ═══════════════════════════════════════

export function showDeckView() {
  const cards = state.deck.allCards;
  const panel = document.getElementById('deck-view-panel');
  const grid  = document.getElementById('deck-view-grid');
  const count = document.getElementById('deck-view-count');
  if (!panel || !grid) return;

  count.textContent = `共 ${cards.length} 张`;
  grid.innerHTML = '';
  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = `card card-${card.type} deck-view-card`;
    el.innerHTML = `
      <div class="card-cost-badge ap-badge-${card.type}">⚡${card.cost}</div>
      <div class="card-name">${card.name}</div>
      <div class="card-desc">${card.desc}</div>`;
    grid.appendChild(el);
  });

  panel.classList.remove('hidden');
}

// ═══════════════════════════════════════
// 怪物手册
// ═══════════════════════════════════════

export function showMonsterBook() {
  const grid  = document.getElementById('monster-book-grid');
  const panel = document.getElementById('monster-book-panel');
  if (!grid || !panel) return;

  grid.innerHTML = '';
  const excluded = new Set(['general_red']); // 剧情专用，不列入手册

  Object.values(MONSTER_DEFS).forEach(def => {
    if (excluded.has(def.id)) return;
    const card = document.createElement('div');
    card.className = 'monster-book-card';

    // 精灵图
    const sprKey = def.id;
    const sp  = MONSTER_SPRITE[sprKey] || MONSTER_SPRITE.default;
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    canvas.style.cssText = 'image-rendering:pixelated;width:40px;height:40px;border-radius:4px;background:#111;';
    const img = getSprite(sp?.sheet);
    if (img) {
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, sp.srcX, sp.srcY, sp.srcW, sp.srcH, 0, 0, 32, 32);
    }

    card.innerHTML = `
      <div class="mb-header"></div>
      <div class="mb-name">${def.emoji || ''} ${def.name}</div>
      <div class="mb-stats">
        <span class="mb-stat mb-hp">❤️ ${def.maxHp}</span>
        <span class="mb-stat mb-atk">⚔️ ${def.atk ?? 0}</span>
        <span class="mb-stat mb-def">🛡 ${def.def ?? 0}</span>
      </div>
      <div class="mb-ap">行动⚡${def.maxAp} &nbsp; 手牌${def.handSize}</div>`;

    card.querySelector('.mb-header').appendChild(canvas);
    grid.appendChild(card);
  });

  panel.classList.remove('hidden');
}

// ═══════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════

function setInner(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function updateHpBar(barId, textId, hp, maxHp, isHero = true) {
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  const fill = document.getElementById(barId);
  const text = document.getElementById(textId);
  if (fill) {
    fill.style.width = pct + '%';
    // 动态颜色：低血量变红
    if (isHero) {
      if (pct < 25) fill.style.background = 'linear-gradient(90deg,#7f0000,#d32f2f)';
      else if (pct < 50) fill.style.background = 'linear-gradient(90deg,#bf360c,#f4511e)';
      else fill.style.background = '';  // 使用CSS默认
    }
  }
  if (text) text.textContent = `${hp} / ${maxHp}`;
}
