/**
 * sprites.js - 素材加载与精灵定义
 * 使用来自 mota-js 的真实魔塔素材
 */

// 精灵表定义
// terrains.png: 32×32px per tile, 1列, scale→48px
// items.png:    32×32px per tile, 1列, scale→48px
// enemy48.png:  32×48px per sprite, 4列(帧), scale→36×48 or 48×48
// hero.png:     32×48px per sprite, 4列(帧), scale→36×48

export const SPRITE_SHEETS = {
  terrains: 'assets/terrains.png',
  items:    'assets/items.png',
  enemy48:  'assets/enemy48.png',
  hero:     'assets/hero.png',
};

// 已加载的 Image 对象缓存
const loaded = {};

/**
 * 预加载所有精灵表，返回 Promise
 */
export function loadAllSprites() {
  const promises = Object.entries(SPRITE_SHEETS).map(([key, src]) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload  = () => { loaded[key] = img; resolve(); };
      img.onerror = () => { console.warn(`素材加载失败: ${src}`); resolve(); };
      img.src = src;
    })
  );
  return Promise.all(promises);
}

/** 获取已加载的图片 */
export function getSprite(key) {
  return loaded[key] || null;
}

// ─────────────────────────────────────────────
// 各瓷砖对应的精灵定义
// ─────────────────────────────────────────────

// TILE_SPRITE[tileType] = { sheet, srcX, srcY, srcW, srcH }
// terrains.png: 宽32px, 每行32px高
// items.png:    宽32px, 每行32px高
export const TILE_SPRITE = {
  // ─ 地形 (terrains.png) ─
  0:  { sheet: 'terrains', srcX: 0, srcY: 64,  srcW: 32, srcH: 32 },  // 地板 row2
  1:  { sheet: 'terrains', srcX: 0, srcY: 128, srcW: 32, srcH: 32 },  // 墙壁 row4
  2:  { sheet: 'terrains', srcX: 0, srcY: 576, srcW: 32, srcH: 32 },  // 黄门 row18
  3:  { sheet: 'terrains', srcX: 0, srcY: 256, srcW: 32, srcH: 32 },  // 蓝门 row8
  4:  { sheet: 'terrains', srcX: 0, srcY: 320, srcW: 32, srcH: 32 },  // 红门 row10
  10: { sheet: 'terrains', srcX: 0, srcY: 192, srcW: 32, srcH: 32 },  // 楼梯 row6

  // ─ 道具 (items.png) ─
  5:  { sheet: 'items', srcX: 0, srcY: 0,   srcW: 32, srcH: 32 },  // 黄钥匙 row0
  6:  { sheet: 'items', srcX: 0, srcY: 64,  srcW: 32, srcH: 32 },  // 蓝钥匙 row2
  7:  { sheet: 'items', srcX: 0, srcY: 128, srcW: 32, srcH: 32 },  // 红钥匙 row4
  12: { sheet: 'items', srcX: 0, srcY: 384, srcW: 32, srcH: 32 },  // 血瓶   row12
  13: { sheet: 'items', srcX: 0, srcY: 512, srcW: 32, srcH: 32 },  // 大血瓶 row16 (蓝药水)
  15: { sheet: 'items', srcX: 0, srcY: 768, srcW: 32, srcH: 32 },  // 刺陷阱 row24 (岩浆)
};

// 怪物精灵 (enemy48.png): 每个sprite 32×48, 4帧/行
// 使用第1帧（静止帧）即 srcX=32, 因为第0帧是开始偏移
export const MONSTER_SPRITE = {
  slime_green: { sheet: 'enemy48', srcX: 32, srcY: 0,   srcW: 32, srcH: 48 },  // 绿史莱姆 row0
};

// 英雄精灵 (hero.png): 每个sprite 32×48, 4帧/行, row0=朝下
// 使用朝下站立帧: 第2列(col1 = srcX=32)
export const HERO_SPRITE = { sheet: 'hero', srcX: 32, srcY: 0, srcW: 32, srcH: 48 };

/**
 * 在 canvas 上绘制一个精灵
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} spriteInfo - { sheet, srcX, srcY, srcW, srcH }
 * @param {number} destX - 目标左上角 X
 * @param {number} destY - 目标左上角 Y
 * @param {number} destW - 目标宽度
 * @param {number} destH - 目标高度
 */
export function drawSprite(ctx, spriteInfo, destX, destY, destW, destH) {
  const img = getSprite(spriteInfo.sheet);
  if (!img) return;
  ctx.drawImage(
    img,
    spriteInfo.srcX, spriteInfo.srcY, spriteInfo.srcW, spriteInfo.srcH,
    destX, destY, destW, destH
  );
}
