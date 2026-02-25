/**
 * main.js - 游戏入口点
 * 初始化游戏、绑定事件处理器、存读档
 */

import { renderMap, initCanvas, pixelToTile } from './renderer.js';
import { updateExploreUI, bindEndTurnButton } from './ui.js';
import { tryMove } from './explore.js';
import { state, resetState } from './state.js';
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

  // 初始化 canvas
  initCanvas();

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

function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (state.phase === 'explore') {
      switch (e.key) {
        case 'ArrowUp':  case 'w': case 'W': e.preventDefault(); tryMove(0, -1); break;
        case 'ArrowDown':case 's': case 'S': e.preventDefault(); tryMove(0,  1); break;
        case 'ArrowLeft':case 'a': case 'A': e.preventDefault(); tryMove(-1, 0); break;
        case 'ArrowRight':case 'd':case 'D': e.preventDefault(); tryMove(1,  0); break;
        case 'Escape': togglePauseMenu(); break;
      }
    } else if (state.phase === 'battle') {
      if (e.key === 'Escape') togglePauseMenu();
    }
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
    const dx = tx - state.player.x;
    const dy = ty - state.player.y;
    if (Math.abs(dx) + Math.abs(dy) === 1) {
      tryMove(dx, dy);
    }
  });
}

// ─── 暂停菜单 ──────────────────────────────────────────────────────────────

function bindPauseMenu() {
  // 菜单按钮
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
