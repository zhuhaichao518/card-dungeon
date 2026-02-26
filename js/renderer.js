/**
 * renderer.js - Canvas 地图渲染器
 * 使用 HTML5 Canvas + mota-js 精灵表绘制地图
 */

import { state } from './state.js';
import { TILE_SPRITE, MONSTER_SPRITE, HERO_SPRITE, drawSprite, getSprite } from './sprites.js';

export const TILE_SIZE = 48;  // 每个瓷砖的像素大小

// Canvas 和 Context 缓存
let canvas = null;
let ctx    = null;

/** 初始化 Canvas */
export function initCanvas() {
  canvas = document.getElementById('map-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;  // 保持像素风格，不模糊
  const cols = state.tiles[0].length;
  const rows = state.tiles.length;
  canvas.width  = cols * TILE_SIZE;
  canvas.height = rows * TILE_SIZE;
}

/**
 * 渲染整张地图
 */
export function renderMap() {
  if (!canvas || !ctx) return;

  const { tiles, player, monsters } = state;
  const rows = tiles.length;
  const cols = tiles[0].length;

  // 清空
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dx = x * TILE_SIZE;
      const dy = y * TILE_SIZE;

      // 1. 先画地板（所有非墙格子下面都有地板）
      const tileType = tiles[y][x];
      if (tileType !== 1) {
        drawTileSprite(ctx, 0, dx, dy);  // 地板
      }

      // 2. 画瓷砖本身（如果不是地板）
      if (tileType !== 0) {
        drawTileSprite(ctx, tileType, dx, dy);
      }
    }
  }

  // 3. 画怪物（enemys.png 32×32，缩放填充 48×48 tile）
  for (const monster of monsters) {
    const dx = monster.x * TILE_SIZE;
    const dy = monster.y * TILE_SIZE;
    const key = monster.defId || monster.id;
    const sp  = MONSTER_SPRITE[key] || MONSTER_SPRITE.default;
    // 32×32 精灵放大至 48×48 填充整格
    drawSprite(ctx, sp, dx, dy, TILE_SIZE, TILE_SIZE);
  }

  // 4. 画玩家
  const px = player.x * TILE_SIZE;
  const py = player.y * TILE_SIZE;
  drawSprite(ctx, HERO_SPRITE, px + 8, py, 32, 48);
}

/**
 * 画指定瓷砖类型的精灵
 */
function drawTileSprite(ctx, tileType, dx, dy) {
  const sp = TILE_SPRITE[tileType];
  if (sp) {
    drawSprite(ctx, sp, dx, dy, TILE_SIZE, TILE_SIZE);
  } else {
    // 找不到精灵时画占位色块
    ctx.fillStyle = tileType === 1 ? '#2a1f3d' : '#1a1a2e';
    ctx.fillRect(dx, dy, TILE_SIZE, TILE_SIZE);
  }
}

/**
 * 根据 canvas 内的像素坐标转换为瓷砖坐标
 * @param {number} canvasX
 * @param {number} canvasY
 * @returns {{x: number, y: number}}
 */
export function pixelToTile(canvasX, canvasY) {
  return {
    x: Math.floor(canvasX / TILE_SIZE),
    y: Math.floor(canvasY / TILE_SIZE),
  };
}
