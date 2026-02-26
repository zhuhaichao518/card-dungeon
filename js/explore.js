/**
 * explore.js - 探索逻辑（含自动寻路）
 */

import { state, addMessage, healPlayer, damagePlayer, loadFloor } from './state.js';
import { TILE } from './data.js';
import { renderMap } from './renderer.js';
import { updateExploreUI, showVictoryScreen } from './ui.js';
import { startBattle } from './battle.js';
import { findPath, findPathToMonster } from './pathfinding.js';
import { runStorySequence, AMBUSH_STORY, PRISON_ESCAPE_STORY } from './story.js';

// ─── 单步移动 ─────────────────────────────────────────────────────────────────
// 返回 'moved' | 'battle' | 'blocked' | 'dead'
export function tryMove(dx, dy) {
  if (state.phase !== 'explore') return 'blocked';

  const nx = state.player.x + dx;
  const ny = state.player.y + dy;

  if (ny < 0 || ny >= state.tiles.length || nx < 0 || nx >= state.tiles[0].length) return 'blocked';

  const tileType = state.tiles[ny][nx];

  // 检查怪物
  const monster = state.monsters.find(m => m.x === nx && m.y === ny);
  if (monster) {
    addMessage(`遭遇 ${monster.name}！准备战斗！`);
    renderMap();
    updateExploreUI();
    startBattle(monster);
    return 'battle';
  }

  switch (tileType) {
    case TILE.WALL: return 'blocked';

    case TILE.FLOOR:
      move(nx, ny); break;

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
        return 'blocked';
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
        return 'blocked';
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
        return 'blocked';
      }
      break;

    case TILE.POTION_S:
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny);
      healPlayer(30);
      addMessage('💊 小血瓶：+30 HP');
      break;

    case TILE.POTION_L:
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny);
      healPlayer(60);
      addMessage('💉 大血瓶：+60 HP');
      break;

    case TILE.SPIKE_TRAP:
      move(nx, ny);
      damagePlayer(15);
      addMessage('⚠️ 刺陷阱！-15 HP');
      break;

    case TILE.EVENT: {
      move(nx, ny);
      // 将该格子替换为普通地板（防止重复触发）
      state.tiles[ny][nx] = TILE.FLOOR;
      const evKey = `floor${state.floor}_${nx}_${ny}`;
      if (!state.storyFlags[evKey]) {
        state.storyFlags[evKey] = true;
        triggerStoryEvent(state.floor, nx, ny);
        return 'story';
      }
      break;
    }

    case TILE.STAIRS:
      move(nx, ny);
      // 监狱逃脱对话（第4层）
      if (state.floor === 4 && !state.storyFlags['prison_escape']) {
        state.storyFlags['prison_escape'] = true;
        renderMap(); updateExploreUI();
        runStorySequence(PRISON_ESCAPE_STORY, () => {
          advanceFloor();
        });
        return 'floor';
      }
      renderMap();
      updateExploreUI();
      advanceFloor();
      return 'floor';

    default:
      move(nx, ny);
  }

  if (state.player.hp <= 0) {
    state.phase = 'gameover';
    showGameOver();
    return 'dead';
  }

  return 'moved';
}

// ─── 寻路点击处理（非相邻格子）─────────────────────────────────────────────────

/**
 * 处理地图点击
 * 先判断是否有怪物，再尝试寻路，依次走完路径
 */
export function handleMapClick(tx, ty) {
  if (state.phase !== 'explore') return;

  const px = state.player.x;
  const py = state.player.y;

  // 点击的是自己
  if (tx === px && ty === py) return;

  // 点击的是怪物 → 寻路到相邻格子后战斗
  const monster = state.monsters.find(m => m.x === tx && m.y === ty);
  if (monster) {
    const result = findPathToMonster(px, py, tx, ty);
    if (!result) { addMessage('无法到达怪物'); renderMap(); updateExploreUI(); return; }
    // 走到旁边
    walkPath(result.path);
    if (state.phase !== 'explore') return;
    // 触发战斗
    tryMove(result.dx, result.dy);
    return;
  }

  // 普通格子 → BFS 寻路
  const path = findPath(px, py, tx, ty);
  if (path === null) {
    // 检查是不是门/陷阱（给出提示）
    const t = state.tiles[ty][tx];
    if (t === TILE.DOOR_YELLOW || t === TILE.DOOR_BLUE || t === TILE.DOOR_RED) {
      addMessage('🚪 目标是门，请相邻时点击开门');
    } else if (t === TILE.WALL) {
      // 无提示
    } else {
      addMessage('无法找到通路');
    }
    renderMap();
    updateExploreUI();
    return;
  }
  walkPath(path);
}

/**
 * 依次走完路径（每步调用 tryMove，遇到战斗/死亡/楼层变化即停）
 */
function walkPath(path) {
  for (let i = 0; i < path.length; i++) {
    if (state.phase !== 'explore') break;

    const step = path[i];
    const dx = step.x - state.player.x;
    const dy = step.y - state.player.y;

    const result = tryMove(dx, dy);
    if (result === 'battle' || result === 'dead' || result === 'floor' || result === 'blocked') {
      break;
    }
  }
  // 最终统一渲染
  if (state.phase === 'explore') {
    renderMap();
    updateExploreUI();
  }
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function move(nx, ny) {
  state.player.x = nx;
  state.player.y = ny;
}

function triggerStoryEvent(floor, x, y) {
  if (floor === 3) {
    // 第3层伏击
    state.phase = 'story';
    renderMap(); updateExploreUI();
    runStorySequence(AMBUSH_STORY, () => {
      state.phase = 'explore';
      renderMap(); updateExploreUI();
    });
  }
}

function advanceFloor() {
  const nextFloor = state.floor + 1;
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
