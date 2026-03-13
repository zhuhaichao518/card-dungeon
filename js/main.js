/**
 * main.js - 游戏入口点
 * 初始化游戏、绑定事件处理器、存读档
 */

import { renderMap, initCanvas, pixelToTile, startAnimLoop } from './renderer.js';
import { updateExploreUI, bindEndTurnButton, showDeckView, showMonsterBook } from './ui.js';
import { tryMove, handleMapClick, animatedMove } from './explore.js';
import { state, resetState, loadFloor } from './state.js';
import { loadAllSprites } from './sprites.js';
import { saveGame, getAllSaves, restoreState } from './save.js';

// ─── 启动 ───────────────────────────────────────────────────────────────────

async function init() {
  // 检查是否从存档启动
  const pendingSlot = sessionStorage.getItem('load_slot');
  if (pendingSlot !== null) {
    sessionStorage.removeItem('load_slot');
    const saves = getAllSaves();
    const data  = saves[parseInt(pendingSlot)];
    if (data) restoreState(state, data);
  }

  // 加载素材
  await loadAllSprites();

  // 初始化 canvas + 启动动画循环
  initCanvas();
  startAnimLoop();

  // 渲染地图
  renderMap();
  updateExploreUI();
  bindEndTurnButton();
  bindKeyboard();
  bindMapClick();
  bindPauseMenu();

  console.log('⚔️ Card Dungeon 已启动！');
}

// ─── 键盘 ────────────────────────────────────────────────────────────────────

// ─── 键盘持续移动 ──────────────────────────────────────────────────────────────
const heldKeys = new Set();
let moveLoopRunning = false;

const DIR_MAP = {
  ArrowUp: [0,-1], w:[0,-1], W:[0,-1],
  ArrowDown:[0,1],  s:[0,1],  S:[0,1],
  ArrowLeft:[-1,0], a:[-1,0], A:[-1,0],
  ArrowRight:[1,0], d:[1,0],  D:[1,0],
};

function getHeldDir() {
  for (const k of heldKeys) {
    if (DIR_MAP[k]) return DIR_MAP[k];
  }
  return null;
}

async function startMoveLoop() {
  if (moveLoopRunning) return;
  moveLoopRunning = true;
  while (state.phase === 'explore') {
    const dir = getHeldDir();
    if (!dir) break;
    const moved = await animatedMove(dir[0], dir[1]);
    if (!moved) break; // 撞墙或触发战斗/楼层切换，停止循环
  }
  moveLoopRunning = false;
}

function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (DIR_MAP[e.key]) e.preventDefault();
    if (state.phase === 'explore' && DIR_MAP[e.key]) {
      heldKeys.add(e.key);
      startMoveLoop();
    } else if (e.key === 'Escape') {
      togglePauseMenu();
    }
  });

  document.addEventListener('keyup', (e) => {
    heldKeys.delete(e.key);
  });
}

// ─── 地图点击（Canvas） ────────────────────────────────────────────────────

function bindMapClick() {
  const canvas = document.getElementById('map-canvas');
  if (!canvas) return;

  canvas.addEventListener('click', (e) => {
    if (state.phase !== 'explore') return;
    const rect = canvas.getBoundingClientRect();
    // 考虑 canvas 缩放（CSS 可能缩放）
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (e.clientX - rect.left) * scaleX;
    const canvasY = (e.clientY - rect.top)  * scaleY;
    const { x: tx, y: ty } = pixelToTile(canvasX, canvasY);
    handleMapClick(tx, ty);
  });
}

// ─── 暂停菜单 ──────────────────────────────────────────────────────────────

function bindPauseMenu() {
  // 菜单按钮
  document.getElementById('btn-deck-view')?.addEventListener('click', showDeckView);
  document.getElementById('deck-view-close')?.addEventListener('click', () => {
    document.getElementById('deck-view-panel')?.classList.add('hidden');
  });
  document.getElementById('btn-monster-book')?.addEventListener('click', showMonsterBook);
  document.getElementById('monster-book-close')?.addEventListener('click', () => {
    document.getElementById('monster-book-panel')?.classList.add('hidden');
  });
  // 调试：楼层跳转
  document.getElementById('btn-goto-floor')?.addEventListener('click', () => {
    const n = parseInt(document.getElementById('debug-floor-input')?.value, 10);
    if (n >= 1 && n <= 50) {
      loadFloor(n);
      state.phase = 'explore';
      renderMap();
      updateExploreUI();
    }
  });

  document.getElementById('btn-pause')?.addEventListener('click', togglePauseMenu);
  document.getElementById('pause-close')?.addEventListener('click', togglePauseMenu);
  document.getElementById('pause-resume')?.addEventListener('click', togglePauseMenu);
  document.getElementById('pause-back-menu')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // 存档槽位
  document.querySelectorAll('.pause-save-slot').forEach(el => {
    el.addEventListener('click', () => {
      const slot = parseInt(el.dataset.slot);
      const ok = saveGame(state, slot);
      if (ok) {
        showToast(`✅ 已保存到存档 ${slot + 1}`);
        refreshPauseSaveSlots();
      }
    });
  });
}

function togglePauseMenu() {
  const menu = document.getElementById('pause-menu');
  if (!menu) return;
  const isHidden = menu.classList.contains('hidden');
  if (isHidden) {
    refreshPauseSaveSlots();
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}

function refreshPauseSaveSlots() {
  const saves = getAllSaves();
  document.querySelectorAll('.pause-save-slot').forEach(el => {
    const slot = parseInt(el.dataset.slot);
    const save = saves[slot];
    const info = el.querySelector('.slot-info');
    if (info) {
      info.textContent = save
        ? `第${save.floor}层 · HP ${save.player.hp}/${save.player.maxHp} · ${save.savedAt}`
        : '（空）';
    }
  });
}

// ─── Toast 提示 ───────────────────────────────────────────────────────────

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 2000);
}

// ─── 导出给 battle.js 使用 ────────────────────────────────────────────────
export { showToast };

// ─── DOM 就绪 ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
