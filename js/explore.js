/**
 * explore.js - 探索逻辑
 * 支持：多楼层跳转 / 大血瓶(13) / 状态效果
 */

import { state, addMessage, healPlayer, damagePlayer, loadFloor } from './state.js';
import { TILE } from './data.js';
import { renderMap } from './renderer.js';
import { updateExploreUI, showVictoryScreen } from './ui.js';
import { startBattle } from './battle.js';

export function tryMove(dx, dy) {
  if (state.phase !== 'explore') return;

  const nx = state.player.x + dx;
  const ny = state.player.y + dy;

  if (ny < 0 || ny >= state.tiles.length || nx < 0 || nx >= state.tiles[0].length) return;

  const tileType = state.tiles[ny][nx];

  // 检查怪物
  const monster = state.monsters.find(m => m.x === nx && m.y === ny);
  if (monster) {
    addMessage(`遭遇 ${monster.name}！准备战斗！`);
    renderMap();
    updateExploreUI();
    startBattle(monster);
    return;
  }

  switch (tileType) {
    case TILE.WALL:
      return;

    case TILE.FLOOR:
      move(nx, ny);
      break;

    case TILE.KEY_YELLOW:
      state.inventory.keyYellow++;
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny);
      addMessage('🔑 拾取黄钥匙');
      break;

    case TILE.KEY_BLUE:
      state.inventory.keyBlue++;
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny);
      addMessage('🔵 拾取蓝钥匙');
      break;

    case TILE.KEY_RED:
      state.inventory.keyRed++;
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny);
      addMessage('🔴 拾取红钥匙');
      break;

    case TILE.DOOR_YELLOW:
      if (state.inventory.keyYellow > 0) {
        state.inventory.keyYellow--;
        state.tiles[ny][nx] = TILE.FLOOR;
        move(nx, ny);
        addMessage('🚪 黄门已打开');
      } else {
        addMessage('❌ 需要黄钥匙');
      }
      break;

    case TILE.DOOR_BLUE:
      if (state.inventory.keyBlue > 0) {
        state.inventory.keyBlue--;
        state.tiles[ny][nx] = TILE.FLOOR;
        move(nx, ny);
        addMessage('🚪 蓝门已打开');
      } else {
        addMessage('❌ 需要蓝钥匙');
      }
      break;

    case TILE.DOOR_RED:
      if (state.inventory.keyRed > 0) {
        state.inventory.keyRed--;
        state.tiles[ny][nx] = TILE.FLOOR;
        move(nx, ny);
        addMessage('🚪 红门已打开');
      } else {
        addMessage('❌ 需要红钥匙');
      }
      break;

    case TILE.POTION_S:  // 小血瓶 +30HP
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny);
      healPlayer(30);
      addMessage('💊 小血瓶：恢复 30 HP');
      break;

    case TILE.POTION_L:  // 大血瓶 +60HP
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny);
      healPlayer(60);
      addMessage('💉 大血瓶：恢复 60 HP');
      break;

    case TILE.SPIKE_TRAP:
      move(nx, ny);
      damagePlayer(15);
      addMessage('⚠️ 刺陷阱！损失 15 HP');
      break;

    case TILE.STAIRS:
      // 进入下一层
      move(nx, ny);
      advanceFloor();
      return;  // advanceFloor 内部会重新渲染

    default:
      move(nx, ny);
  }

  if (state.player.hp <= 0) {
    state.phase = 'gameover';
    showGameOver();
    return;
  }

  renderMap();
  updateExploreUI();
}

function move(nx, ny) {
  state.player.x = nx;
  state.player.y = ny;
}

function advanceFloor() {
  const nextFloor = state.floor + 1;
  // 清空本层背包钥匙（可选：保留或清空，这里保留）
  loadFloor(nextFloor);

  if (state.phase === 'victory') {
    showVictoryScreen();
    return;
  }

  renderMap();
  updateExploreUI();
}

function showGameOver() {
  const ov = document.getElementById('overlay');
  document.getElementById('overlay-title').textContent = '💀 游戏结束';
  document.getElementById('overlay-msg').textContent   = '你在地牢中倒下了……';
  const btn = document.getElementById('overlay-btn');
  btn.textContent = '重新开始';
  btn.onclick     = () => location.reload();
  ov.classList.remove('hidden');
}
