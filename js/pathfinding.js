/**
 * pathfinding.js - BFS 寻路
 * 障碍物：墙(1)、门(2/3/4)、陷阱(15)、怪物位置
 * 可穿越：地板、钥匙、血瓶、楼梯
 */

import { state } from './state.js';
import { TILE } from './data.js';

// 自动寻路中间路径不能穿过的格子
// 注意：这些格子只阻止"途经"，不阻止"作为终点被点击"
const OBSTACLE_TILES = new Set([
  TILE.WALL,
  TILE.DOOR_YELLOW,
  TILE.DOOR_BLUE,
  TILE.DOOR_RED,
  TILE.SPIKE_TRAP,
  TILE.KEY_YELLOW,
  TILE.KEY_BLUE,
  TILE.KEY_RED,
  TILE.POTION_S,
  TILE.POTION_L,
]);

// 终点也绝对不可达的格子（只有实体墙）
const HARD_BLOCK = new Set([TILE.WALL]);

/**
 * BFS 寻路
 * @param {number} sx - 起点 x
 * @param {number} sy - 起点 y
 * @param {number} tx - 终点 x
 * @param {number} ty - 终点 y
 * @returns {Array<{x,y}>|null} 从下一步到终点的步骤数组，或 null（不可达）
 */
export function findPath(sx, sy, tx, ty) {
  if (sx === tx && sy === ty) return [];

  const tiles    = state.tiles;
  const rows     = tiles.length;
  const cols     = tiles[0].length;
  const monsters = state.monsters;

  // 构建怪物位置 Set（快速查找）
  const monsterPos = new Set(monsters.map(m => `${m.x},${m.y}`));

  // BFS
  const visited = Array.from({ length: rows }, () => new Uint8Array(cols));
  const parent  = Array.from({ length: rows }, () => Array(cols).fill(null));

  visited[sy][sx] = 1;
  const queue = [{ x: sx, y: sy }];

  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];

  while (queue.length > 0) {
    const cur = queue.shift();

    if (cur.x === tx && cur.y === ty) {
      // 回溯路径
      const path = [];
      let node = { x: tx, y: ty };
      while (node.x !== sx || node.y !== sy) {
        path.unshift(node);
        node = parent[node.y][node.x];
      }
      return path;
    }

    for (const [dx, dy] of dirs) {
      const nx = cur.x + dx;
      const ny = cur.y + dy;

      if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
      if (visited[ny][nx]) continue;

      const tileType = tiles[ny][nx];

      if (nx !== tx || ny !== ty) {
        // 中间格子：墙/门/陷阱/资源均不可穿越
        if (OBSTACLE_TILES.has(tileType)) continue;
        if (monsterPos.has(`${nx},${ny}`)) continue;
      } else {
        // 终点格子：只有实体墙不可到达
        // 血瓶/钥匙/门/陷阱均可作为点击目标（由 tryMove 处理逻辑）
        if (HARD_BLOCK.has(tileType)) continue;
      }

      visited[ny][nx] = 1;
      parent[ny][nx] = cur;
      queue.push({ x: nx, y: ny });
    }
  }

  return null; // 不可达
}

/**
 * 找到目标怪物周围最近的可到达格子（用于点击怪物时寻路）
 * @param {number} px - 玩家 x
 * @param {number} py - 玩家 y
 * @param {number} mx - 怪物 x
 * @param {number} my - 怪物 y
 * @returns {{path, dx, dy}|null}
 */
export function findPathToMonster(px, py, mx, my) {
  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  let best = null;

  for (const [dx, dy] of dirs) {
    const nx = mx + dx;
    const ny = my + dy;
    // 该相邻格子需要是地板（怪物旁边的格子）
    const tiles = state.tiles;
    if (ny < 0 || ny >= tiles.length || nx < 0 || nx >= tiles[0].length) continue;
    const t = tiles[ny][nx];
    if (t === TILE.WALL || t === TILE.SPIKE_TRAP) continue;
    // 怪物位置排除
    if (state.monsters.some(m => m.x === nx && m.y === ny)) continue;

    // 如果已经在该格子旁边，直接返回走一步
    if (nx === px && ny === py) return { path: [], dx: -dx, dy: -dy };

    const path = findPath(px, py, nx, ny);
    if (path !== null) {
      if (!best || path.length < best.path.length) {
        best = { path, dx: mx - nx, dy: my - ny };
      }
    }
  }
  return best;
}
