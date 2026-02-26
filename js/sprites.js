/**
 * sprites.js - 素材加载与精灵定义
 * 使用来自 mota-js 的真实魔塔素材
 *
 * 素材说明：
 *   terrains.png : 32×32 地形，多行排列
 *   items.png    : 32×32 道具，多行排列
 *   enemys.png   : 32×32 怪物，每行2帧，共73行
 *   enemy48.png  : 32×48 怪物，每行4帧，共8行
 *   hero.png     : 32×48 英雄，每行4帧
 */

export const SPRITE_SHEETS = {
  terrains: 'assets/terrains.png',
  items:    'assets/items.png',
  enemys:   'assets/enemys.png',   // 主要怪物图，73种
  enemy48:  'assets/enemy48.png',  // 备用大图怪物
  hero:     'assets/hero.png',
};

// 已加载的 Image 对象缓存
const loaded = {};

/**
 * 预加载所有精灵表，返回 Promise
 */
export function loadAllSprites() {
  const promises = Object.entries(SPRITE_SHEETS).map(([key, src]) =>
    new Promise((resolve) => {
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

// ─────────────────────────────────────────────────────────────────
// 地图瓷砖精灵
// ─────────────────────────────────────────────────────────────────
// TILE_SPRITE[tileType] = { sheet, srcX, srcY, srcW, srcH }
export const TILE_SPRITE = {
  // ─ 地形 (terrains.png) ─
  0:  { sheet:'terrains', srcX:0, srcY:64,  srcW:32, srcH:32 },  // 地板  row2
  1:  { sheet:'terrains', srcX:0, srcY:128, srcW:32, srcH:32 },  // 墙壁  row4
  2:  { sheet:'terrains', srcX:0, srcY:576, srcW:32, srcH:32 },  // 黄门  row18
  3:  { sheet:'terrains', srcX:0, srcY:256, srcW:32, srcH:32 },  // 蓝门  row8
  4:  { sheet:'terrains', srcX:0, srcY:320, srcW:32, srcH:32 },  // 红门  row10
  10: { sheet:'terrains', srcX:0, srcY:192, srcW:32, srcH:32 },  // 楼梯  row6

  // ─ 道具 (items.png) ─
  5:  { sheet:'items', srcX:0, srcY:0,   srcW:32, srcH:32 },  // 黄钥匙 row0
  6:  { sheet:'items', srcX:0, srcY:64,  srcW:32, srcH:32 },  // 蓝钥匙 row2
  7:  { sheet:'items', srcX:0, srcY:128, srcW:32, srcH:32 },  // 红钥匙 row4
  12: { sheet:'items', srcX:0, srcY:384, srcW:32, srcH:32 },  // 小血瓶 row12
  13: { sheet:'items', srcX:0, srcY:512, srcW:32, srcH:32 },  // 大血瓶 row16
  15: { sheet:'items', srcX:0, srcY:768, srcW:32, srcH:32 },  // 刺陷阱 row24
};

// ─────────────────────────────────────────────────────────────────
// 怪物精灵（enemys.png，32×32，2帧/行）
//
// 图标行号对照（来自 mota-js/project/icons.js）：
//   greenSlime=0, redSlime=1, blackSlime=2, slimelord=3
//   bat=4, bigBat=5, redBat=6, vampire=7
//   skeleton=8, skeletonWarrior=9, skeletonCaptain=10
//   ghostSoldier=11, zombie=12, zombieKnight=13, rock=14
//   slimeman=15, bluePriest=16, redPriest=17
//   brownWizard=18, redWizard=19
//   yellowGateKeeper=20, blueGateKeeper=21, redGateKeeper=22
//   swordsman=23, soldier=24, yellowKnight=25, redKnight=26, darkKnight=27
//   blackKing=28, yellowKing=29, greenKing=30, blueKnight=31
//   goldSlime=32, poisonSkeleton=33, poisonBat=34, ironRock=35
//   skeletonPriest=36, skeletonKing=37, skeletonPresbyter=38, skeletonKnight=39
//   evilHero=40, devilWarrior=41, demonPriest=42, goldHornSlime=43
//   redKing=44, blueKing=45, magicMaster=46
//   devilKnight=68
// ─────────────────────────────────────────────────────────────────

/**
 * 用行号构建 enemys.png 精灵定义（32×32，取第1帧 srcX=0）
 */
function eRow(row) {
  return { sheet:'enemys', srcX:0, srcY: row * 32, srcW:32, srcH:32 };
}

export const MONSTER_SPRITE = {
  // ── 普通怪物 ─────────────────────────────────────────────────
  slime_green:  eRow(0),   // 绿头怪 (greenSlime)
  slime_red:    eRow(1),   // 红头怪 (redSlime)
  bat:          eRow(4),   // 小蝙蝠 (bat)
  skeleton:     eRow(8),   // 骷髅人 (skeleton)
  goblin:       eRow(12),  // 兽人  (zombie, 绿兽人外观)
  gargoyle:     eRow(14),  // 石头人 (rock)
  fire_demon:   eRow(7),   // 冥灵魔王 (vampire, 深红外观)
  lich:         eRow(38),  // 骷髅巫师 (skeletonPresbyter)
  demon_knight: eRow(26),  // 红骑士  (redKnight)
  dragon:       eRow(42),  // 魔神法师 (demonPriest, 高级法师外观)

  // ── Boss ─────────────────────────────────────────────────────
  slime_king:    eRow(3),  // 怪王    (slimelord)
  skeleton_king: eRow(37), // 骷髅王  (skeletonKing)
  archmage:      eRow(46), // 黑暗大法师 (magicMaster)
  dragon_god:    eRow(68), // 恶灵骑士 (devilKnight, 最终Boss)

  // 默认后备（避免报错）
  default: eRow(0),
};

// ─────────────────────────────────────────────────────────────────
// 英雄精灵（hero.png：32×48，row0=朝下，取第2帧 srcX=32）
// ─────────────────────────────────────────────────────────────────
export const HERO_SPRITE = { sheet:'hero', srcX:32, srcY:0, srcW:32, srcH:48 };

// ─────────────────────────────────────────────────────────────────
// 绘制精灵
// ─────────────────────────────────────────────────────────────────

/**
 * 在 canvas 上绘制一个精灵
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ sheet:string, srcX:number, srcY:number, srcW:number, srcH:number }} sp
 * @param {number} dx  目标左上 X
 * @param {number} dy  目标左上 Y
 * @param {number} dw  目标宽
 * @param {number} dh  目标高
 */
export function drawSprite(ctx, sp, dx, dy, dw, dh) {
  const img = getSprite(sp.sheet);
  if (!img) return;
  ctx.drawImage(img, sp.srcX, sp.srcY, sp.srcW, sp.srcH, dx, dy, dw, dh);
}
