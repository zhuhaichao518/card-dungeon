/**
 * explore.js - 探索逻辑（含自动寻路）
 */

import { state, addMessage, healPlayer, damagePlayer, loadFloor, retreatFloor } from './state.js';
import { TILE, NPC_EVENTS } from './data.js';
import { renderMap } from './renderer.js';
import { updateExploreUI, showVictoryScreen } from './ui.js';
import { startBattle } from './battle.js';
import { findPath, findPathToMonster } from './pathfinding.js';
import { runStorySequence, AMBUSH_STORY, PRISON_ESCAPE_STORY } from './story.js';
import { playFloorBgm } from './audio.js';

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
      move(nx, ny, dx, dy);
      checkCoordEvent(nx, ny);
      break;

    case TILE.KEY_YELLOW:
      state.inventory.keyYellow++;
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny, dx, dy);
      addMessage('🔑 拾取黄钥匙');
      break;

    case TILE.KEY_BLUE:
      state.inventory.keyBlue++;
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny, dx, dy);
      addMessage('🔵 拾取蓝钥匙');
      break;

    case TILE.KEY_RED:
      state.inventory.keyRed++;
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny, dx, dy);
      addMessage('🔴 拾取红钥匙');
      break;

    case TILE.DOOR_YELLOW:
      if (state.inventory.keyYellow > 0) {
        state.inventory.keyYellow--;
        state.tiles[ny][nx] = TILE.FLOOR;
        move(nx, ny, dx, dy);
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
        move(nx, ny, dx, dy);
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
        move(nx, ny, dx, dy);
        addMessage('🚪 红门已打开');
      } else {
        addMessage('❌ 需要红钥匙');
        return 'blocked';
      }
      break;

    case TILE.POTION_S:
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny, dx, dy);
      healPlayer(30);
      addMessage('💊 小血瓶：+30 HP');
      break;

    case TILE.POTION_L:
      state.tiles[ny][nx] = TILE.FLOOR;
      move(nx, ny, dx, dy);
      healPlayer(60);
      addMessage('💉 大血瓶：+60 HP');
      break;

    case TILE.GEM_RED:
      move(nx, ny, dx, dy);
      state.tiles[ny][nx] = TILE.FLOOR;
      state.player.atk += 1;
      addMessage(`💎 红宝石！攻击力 ${state.player.atk - 1} → ${state.player.atk}`);
      break;

    case TILE.GEM_BLUE:
      move(nx, ny, dx, dy);
      state.tiles[ny][nx] = TILE.FLOOR;
      state.player.def += 1;
      addMessage(`💙 蓝宝石！防御力 ${state.player.def - 1} → ${state.player.def}`);
      break;

    case TILE.SPIKE_TRAP:
      move(nx, ny, dx, dy);
      damagePlayer(15);
      addMessage('⚠️ 刺陷阱！-15 HP');
      break;

    case TILE.EVENT: {
      // 检查是否是 NPC ──────────────────────────────────────────────────────
      const npcKey = `${state.floor}_${nx}_${ny}`;
      const npcEv  = NPC_EVENTS[npcKey];
      if (npcEv) {
        // ★ NPC 阻挡移动（原版行为：player 留在原地，贴近触发对话）
        // 智慧老人说完后 tile 变地板（消失）；商人/公主保留
        triggerNpcEvent(npcEv, nx, ny);
        return 'story';
      }
      // 否则是一次性剧情格（可走入）
      move(nx, ny, dx, dy);
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
      move(nx, ny, dx, dy);
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

    case TILE.STAIRS_DOWN:
      if (state.floor > 1) {
        move(nx, ny, dx, dy);
        renderMap();
        updateExploreUI();
        retreatFloor();
        return 'floor';
      }
      return 'blocked';

    default:
      move(nx, ny, dx, dy);
  }

  if (state.player.hp <= 0) {
    state.phase = 'gameover';
    showGameOver();
    return 'dead';
  }

  return 'moved';
}

// ─── 键盘单步动画移动 ──────────────────────────────────────────────────────────
/**
 * 带平滑动画的单步移动（供键盘 WASD 使用）
 */
/**
 * 带动画的单步移动。返回 true=实际移动了，false=被阻挡/未移动。
 */
export async function animatedMove(dx, dy) {
  if (_isWalking || state.phase !== 'explore') return false;
  _isWalking = true;
  try {
    const fromX = state.player.renderX ?? (state.player.x * TILE_PX);
    const fromY = state.player.renderY ?? (state.player.y * TILE_PX);

    // 立即更新朝向（撞墙时也能转身），帧循环交给 move() 处理
    if      (dx < 0) state.player.dir = 'left';
    else if (dx > 0) state.player.dir = 'right';
    else if (dy < 0) state.player.dir = 'up';
    else             state.player.dir = 'down';

    // 开门动画
    await playDoorAnim(state.player.x + dx, state.player.y + dy);

    const result = tryMove(dx, dy);

    const toX = state.player.renderX;
    const toY = state.player.renderY;

    if (fromX !== toX || fromY !== toY) {
      await animateTileStep(fromX, fromY, toX, toY);
    } else {
      renderMap(); // 撞墙时也刷新以显示转身
    }
    if (result === 'moved') {
      updateExploreUI();
    }
    return result !== 'blocked';
  } finally {
    state.player.animFrame = 0;
    _isWalking = false;
  }
}

// ─── 寻路点击处理（非相邻格子）─────────────────────────────────────────────────

/**
 * 处理地图点击
 * 先判断是否有怪物，再尝试寻路，依次走完路径
 */
export async function handleMapClick(tx, ty) {
  if (state.phase !== 'explore') return;
  if (_isWalking) return; // 走路中不接受新点击

  const px = state.player.x;
  const py = state.player.y;

  // 点击的是自己
  if (tx === px && ty === py) return;

  // 点击的是怪物 → 寻路到相邻格子后战斗
  const monster = state.monsters.find(m => m.x === tx && m.y === ty);
  if (monster) {
    const result = findPathToMonster(px, py, tx, ty);
    if (!result) { addMessage('无法到达怪物'); renderMap(); updateExploreUI(); return; }
    // 走到旁边（等待动画完成）
    await walkPath(result.path);
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
  await walkPath(path);
}

// ─── 开门动画 ─────────────────────────────────────────────────────────────────
// animates.png 各门的行号
const DOOR_ANIM_ROW = {
  [TILE.DOOR_YELLOW]: 4,
  [TILE.DOOR_BLUE]:   5,
  [TILE.DOOR_RED]:    6,
};
const KEY_FOR_DOOR = {
  [TILE.DOOR_YELLOW]: 'keyYellow',
  [TILE.DOOR_BLUE]:   'keyBlue',
  [TILE.DOOR_RED]:    'keyRed',
};

/**
 * 如果目标格是门且玩家有钥匙，先播放4帧开门动画再返回
 */
async function playDoorAnim(nx, ny) {
  const tileType = state.tiles[ny]?.[nx];
  const row = DOOR_ANIM_ROW[tileType];
  if (!row) return;
  const key = KEY_FOR_DOOR[tileType];
  if (!key || state.inventory[key] <= 0) return;

  const FRAME_MS = 60;
  for (let frame = 0; frame < 4; frame++) {
    state.doorAnim = { x: nx, y: ny, row, frame };
    renderMap();
    await new Promise(r => setTimeout(r, FRAME_MS));
  }
  state.doorAnim = null;
}

// ─── 行走动画 ─────────────────────────────────────────────────────────────────

const TILE_PX    = 48;           // 与 renderer.js 的 TILE_SIZE 保持一致
const STEP_MS    = 150;          // 每步动画时长（毫秒）
const WALK_CYCLE = [0, 1, 2, 3]; // 移动时0→1→2→3循环，停止后回frame0

let _isWalking    = false;
let _walkCycleIdx = 0;

/**
 * 平滑将 renderX/Y 从 (fromX,fromY) 插值到 (toX,toY)，easeInOut
 * 同时每帧调用 renderMap 以更新画面
 */
function animateTileStep(fromX, fromY, toX, toY) {
  return new Promise(resolve => {
    const start = performance.now();
    function tick(now) {
      const raw  = Math.min((now - start) / STEP_MS, 1);
      // 匀速线性插值
      state.player.renderX = fromX + (toX - fromX) * raw;
      state.player.renderY = fromY + (toY - fromY) * raw;
      renderMap();
      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        state.player.renderX = toX;
        state.player.renderY = toY;
        resolve();
      }
    }
    requestAnimationFrame(tick);
  });
}

async function walkPath(path) {
  _isWalking = true;
  try {
    for (let i = 0; i < path.length; i++) {
      if (state.phase !== 'explore') break;

      const step = path[i];
      const dx = step.x - state.player.x;
      const dy = step.y - state.player.y;

      // 捕获动画起点（在 tryMove/move 之前，move 会将 renderX/Y 吸附到目标格）
      const fromX = state.player.renderX ?? (state.player.x * TILE_PX);
      const fromY = state.player.renderY ?? (state.player.y * TILE_PX);

      // 开门动画（有钥匙才播）
      await playDoorAnim(state.player.x + dx, state.player.y + dy);

      const result = tryMove(dx, dy);

      // move() 已将 renderX/Y 吸附到新格，取为动画终点
      const toX = state.player.renderX;
      const toY = state.player.renderY;

      if (fromX !== toX || fromY !== toY) {
        // 实际移动了：用动画从起点平滑到终点
        await animateTileStep(fromX, fromY, toX, toY);
      }

      if (result === 'battle' || result === 'dead' || result === 'floor' || result === 'blocked') {
        break;
      }
    }
  } finally {
    // 无论如何都重置状态
    state.player.animFrame = 0;
    _isWalking = false;
  }

  if (state.phase === 'explore') {
    renderMap();
    updateExploreUI();
  }
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function move(nx, ny, dx, dy) {
  state.player.x = nx;
  state.player.y = ny;
  // 始终同步像素坐标（键盘/直接 tryMove 时也不会脱同步）
  state.player.renderX = nx * TILE_PX;
  state.player.renderY = ny * TILE_PX;
  // 记录朝向
  if      (dx < 0) state.player.dir = 'left';
  else if (dx > 0) state.player.dir = 'right';
  else if (dy < 0) state.player.dir = 'up';
  else             state.player.dir = 'down';
  // 推进走路帧（仅在有动画 context 时有意义；walkPath 会在 animateTileStep 里覆盖）
  _walkCycleIdx = (_walkCycleIdx + 1) % 4;
  state.player.animFrame = WALK_CYCLE[_walkCycleIdx];
}

function triggerStoryEvent(floor, x, y) {
  // 其余楼层的 EVENT 格触发（占位，按需扩展）
}

// ── NPC 对话 / 商店事件 ───────────────────────────────────────────────────────

function triggerNpcEvent(ev, tx, ty) {
  // tx/ty = NPC的格子坐标（玩家不会走进去，只是贴近触发）
  state.phase = 'story';
  renderMap(); updateExploreUI();

  const afterTalk = () => {
    // 智慧老人说完后消失（同原版 role[f][idx]=0）
    if (ev.type === 'wiser' || ev.type === 'npc') {
      state.tiles[ty][tx] = TILE.FLOOR;
      applyNpcEffect(ev);
    }
    state.phase = 'explore';
    renderMap(); updateExploreUI();
  };

  switch (ev.type) {
    case 'wiser':
    case 'npc':
    case 'princess':
      runStorySequence([
        { type:'text', portrait: npcPortrait(ev.type), speaker: ev.speaker, text: ev.text }
      ], afterTalk);
      break;

    case 'shop':
      showNpcShop(ev, afterTalk);
      break;

    case 'dragon':
      runStorySequence([
        { type:'text', portrait:'🐉', speaker:'魔龙', text: ev.text },
        { type:'text', portrait:'🐉', speaker:'魔龙', text:'你休想通过这里！与我战斗，或者从暗道绕行！' }
      ], afterTalk);
      break;

    default:
      afterTalk();
  }
}

/** NPC 对话后的副作用（对应原版 checkEvent） */
function applyNpcEffect(ev) {
  const key = `${ev.floor}_${ev.x}_${ev.y}`;
  // floor2 (0-indexed=1) 智慧老人(idx=43): 攻防+10%
  if (ev.floor === 2 && ev.x === 10 && ev.y === 3) {
    state.player.atk  = Math.floor(state.player.atk * 1.1);
    state.player.def  = Math.floor(state.player.def * 1.1);
    addMessage('✨ 智慧老人：攻防 +10%！');
  }
  // floor3 (0-indexed=2) 智慧老人: 给"怪物书"提示
  if (ev.floor === 3 && ev.x === 10 && ev.y === 3) {
    addMessage('📖 获得怪物书！（可在手册查看怪物详情）');
  }
}

function npcPortrait(type) {
  return { wiser:'🧙', shop:'💰', princess:'👸', dragon:'🐉', npc:'👤' }[type] || '👤';
}

function showNpcShop(ev, onDone) {
  runStorySequence([
    { type:'text', portrait:'💰', speaker:ev.speaker, text: ev.text },
    { type:'text', portrait:'💰', speaker:ev.speaker, text:'（商店功能即将上线……目前只提供情报。）' }
  ], onDone);
}

// ── 坐标触发事件（同原版 checkEvent 的位置判断） ────────────────────────────────
function checkCoordEvent(x, y) {
  // 3楼（state.floor=2，0-indexed）走廊中央 (x=5, y=4)：将军埋伏！
  // 对应原版 10楼陷阱逻辑：player.floor===10 && player.x===6 && player.y===6
  if (state.floor === 3 && x === 4 && y === 8 && !state.storyFlags['ambush_3']) {
    state.storyFlags['ambush_3'] = true;
    state.phase = 'story';
    renderMap();
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
  playFloorBgm(state.floor);
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
