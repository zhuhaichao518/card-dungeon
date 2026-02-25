/**
 * explore.js - 探索逻辑
 * 处理玩家移动、拾取道具、开门、触发战斗
 */

import { state, addMessage, healPlayer, damagePlayer } from './state.js';
import { TILE } from './data.js';
import { renderMap } from './renderer.js';
import { updateExploreUI } from './ui.js';
import { startBattle } from './battle.js';

/**
 * 尝试向指定方向移动
 * @param {number} dx - x方向偏移 (-1, 0, 1)
 * @param {number} dy - y方向偏移 (-1, 0, 1)
 */
export function tryMove(dx, dy) {
  if (state.phase !== 'explore') return;

  const nx = state.player.x + dx;
  const ny = state.player.y + dy;

  // 边界检查
  if (ny < 0 || ny >= state.tiles.length || nx < 0 || nx >= state.tiles[0].length) return;

  const tileType = state.tiles[ny][nx];

  // 检查是否有怪物
  const monster = state.monsters.find(m => m.x === nx && m.y === ny);
  if (monster) {
    addMessage(`遭遇了 ${monster.name}！进入战斗！`);
    renderMap();
    updateExploreUI();
    startBattle(monster);
    return;
  }

  // 根据瓷砖类型处理
  switch (tileType) {
    case TILE.WALL:
      // 撞墙，不动
      return;

    case TILE.FLOOR:
      // 正常移动
      movePlayer(nx, ny);
      break;

    case TILE.KEY_YELLOW:
      state.inventory.keyYellow++;
      state.tiles[ny][nx] = TILE.FLOOR;
      movePlayer(nx, ny);
      addMessage('拾取了黄钥匙！');
      break;

    case TILE.KEY_BLUE:
      state.inventory.keyBlue++;
      state.tiles[ny][nx] = TILE.FLOOR;
      movePlayer(nx, ny);
      addMessage('拾取了蓝钥匙！');
      break;

    case TILE.KEY_RED:
      state.inventory.keyRed++;
      state.tiles[ny][nx] = TILE.FLOOR;
      movePlayer(nx, ny);
      addMessage('拾取了红钥匙！');
      break;

    case TILE.DOOR_YELLOW:
      if (state.inventory.keyYellow > 0) {
        state.inventory.keyYellow--;
        state.tiles[ny][nx] = TILE.FLOOR;
        movePlayer(nx, ny);
        addMessage('用黄钥匙打开了黄门！');
      } else {
        addMessage('需要黄钥匙才能打开这扇门！');
      }
      break;

    case TILE.DOOR_BLUE:
      if (state.inventory.keyBlue > 0) {
        state.inventory.keyBlue--;
        state.tiles[ny][nx] = TILE.FLOOR;
        movePlayer(nx, ny);
        addMessage('用蓝钥匙打开了蓝门！');
      } else {
        addMessage('需要蓝钥匙才能打开这扇门！');
      }
      break;

    case TILE.DOOR_RED:
      if (state.inventory.keyRed > 0) {
        state.inventory.keyRed--;
        state.tiles[ny][nx] = TILE.FLOOR;
        movePlayer(nx, ny);
        addMessage('用红钥匙打开了红门！');
      } else {
        addMessage('需要红钥匙才能打开这扇门！');
      }
      break;

    case TILE.HEALTH_POTION:
      state.tiles[ny][nx] = TILE.FLOOR;
      movePlayer(nx, ny);
      healPlayer(30);
      addMessage('喝下血瓶，恢复了30点生命！');
      break;

    case TILE.SPIKE_TRAP:
      // 踩到陷阱，扣血后站上去
      movePlayer(nx, ny);
      damagePlayer(10);
      addMessage('踩到刺陷阱！损失了10点生命！');
      // 陷阱不消失（可重复踩）
      break;

    case TILE.STAIRS:
      addMessage('楼梯通往更深处……（施工中，敬请期待）');
      break;

    default:
      movePlayer(nx, ny);
  }

  // 检查死亡
  if (state.player.hp <= 0) {
    state.phase = 'gameover';
    showGameOver();
    return;
  }

  renderMap();
  updateExploreUI();
}

/**
 * 实际移动玩家坐标
 */
function movePlayer(nx, ny) {
  state.player.x = nx;
  state.player.y = ny;
}

/**
 * 处理点击地图格子（移动端/鼠标支持）
 * 只允许点击相邻格子
 * @param {number} tx - 目标x
 * @param {number} ty - 目标y
 */
export function handleTileClick(tx, ty) {
  if (state.phase !== 'explore') return;

  const dx = tx - state.player.x;
  const dy = ty - state.player.y;

  // 只允许相邻移动（曼哈顿距离=1）
  if (Math.abs(dx) + Math.abs(dy) === 1) {
    tryMove(dx, dy);
  }
}

/**
 * 显示游戏结束界面
 */
function showGameOver() {
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayMsg = document.getElementById('overlay-msg');
  const overlayBtn = document.getElementById('overlay-btn');

  overlayTitle.textContent = '💀 游戏结束';
  overlayMsg.textContent = '你在地牢中倒下了……';
  overlayBtn.textContent = '重新开始';
  overlayBtn.onclick = () => {
    location.reload();
  };

  overlay.classList.remove('hidden');
}
