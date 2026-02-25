/**
 * main.js - 游戏入口点
 * 初始化游戏、绑定事件处理器
 */

import { renderMap } from './renderer.js';
import { updateExploreUI, bindEndTurnButton } from './ui.js';
import { tryMove, handleTileClick } from './explore.js';
import { state } from './state.js';

/**
 * 游戏初始化
 */
function init() {
  renderMap();
  updateExploreUI();
  bindEndTurnButton();
  bindKeyboard();
  bindMapClick();
  console.log('⚔️ Card Dungeon 已启动！');
}

/**
 * 绑定键盘事件（WASD + 方向键）
 */
function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    // 战斗阶段不响应移动键
    if (state.phase !== 'explore') return;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault();
        tryMove(0, -1);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        tryMove(0, 1);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault();
        tryMove(-1, 0);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault();
        tryMove(1, 0);
        break;
    }
  });
}

/**
 * 绑定地图点击事件（移动端/鼠标）
 */
function bindMapClick() {
  const grid = document.getElementById('map-grid');
  if (!grid) return;

  // 使用事件委托
  grid.addEventListener('click', (e) => {
    const cell = e.target.closest('.tile');
    if (!cell) return;

    const tx = parseInt(cell.dataset.x, 10);
    const ty = parseInt(cell.dataset.y, 10);
    handleTileClick(tx, ty);
  });
}

// DOM 就绪后启动
document.addEventListener('DOMContentLoaded', init);
