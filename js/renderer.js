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

// ── 动画帧状态 ──────────────────────────────────────────────────────────────
let animFrame    = 0;      // 当前帧索引 (0 或 1)
let lastAnimTime = 0;
const ANIM_INTERVAL = 400; // ms，每400ms切换一帧

/** 启动地图动画循环（在 init 时调用一次） */
export function startAnimLoop() {
  function loop(ts) {
    if (ts - lastAnimTime >= ANIM_INTERVAL) {
      animFrame = 1 - animFrame;
      lastAnimTime = ts;
      // 只在探索阶段自动重绘
      if (state.phase === 'explore') renderMap();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

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
      const tileType = tiles[y][x];

      // 1. 所有格子先铺地板（包括墙下面）
      drawTileSprite(ctx, 0, dx, dy);

      // 2. 画墙或其他非地板瓷砖
      if (tileType === 1) {
        // 墙：animates.png row10 = yellowWall（经典黄色砖墙，第0帧 srcX=0）
        const img = getSprite('animates');
        if (img) {
          ctx.save();
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 320, 32, 32, dx, dy, TILE_SIZE, TILE_SIZE);
          ctx.restore();
        } else {
          ctx.fillStyle = '#c8a020';
          ctx.fillRect(dx, dy, TILE_SIZE, TILE_SIZE);
        }
      } else if (tileType !== 0) {
        drawTileSprite(ctx, tileType, dx, dy);
      }
    }
  }

  // 3. 画怪物（使用 animFrame 切换动画帧）
  for (const monster of monsters) {
    const dx = monster.x * TILE_SIZE;
    const dy = monster.y * TILE_SIZE;
    const key = monster.defId || monster.id;
    const baseSp = MONSTER_SPRITE[key] || MONSTER_SPRITE.default;
    // enemys.png：每行2帧，frame0=srcX:0, frame1=srcX:32
    const sp = { ...baseSp, srcX: animFrame * 32 };
    drawSprite(ctx, sp, dx, dy, TILE_SIZE, TILE_SIZE);
  }

  // 4. 画玩家（使用平滑插值坐标 renderX/Y）
  const px = player.renderX ?? (player.x * TILE_SIZE);
  const py = player.renderY ?? (player.y * TILE_SIZE);
  // brave.png: 4方向行(row) × 4帧列(col)，各32×32
  // row: down=0, left=1, right=2, up=3 | col = animFrame(0-3)
  const DIR_ROW = { down:0, left:1, right:2, up:3 };
  const dirRow   = DIR_ROW[state.player.dir ?? 'down'];
  const animFr   = state.player.animFrame ?? 1;
  const heroSp   = { sheet:'brave', srcX: animFr * 32, srcY: dirRow * 32, srcW:32, srcH:32 };
  drawSprite(ctx, heroSp, px, py, TILE_SIZE, TILE_SIZE);
}

/**
 * 画指定瓷砖类型的精灵
 */
function drawTileSprite(ctx, tileType, dx, dy) {
  const sp = TILE_SPRITE[tileType];
  if (sp) {
    drawSprite(ctx, sp, dx, dy, TILE_SIZE, TILE_SIZE);
  } else {
    // 无精灵时的占位色块（排除墙，墙在主循环里单独处理）
    ctx.fillStyle = '#1a1a2e';
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
