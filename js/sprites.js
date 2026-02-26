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
  animates: 'assets/animates.png',  // 门/陷阱动画（128×928，4帧/行，32×32/帧）
  items:    'assets/items.png',
  enemys:   'assets/enemys.png',   // 主要怪物图，73种
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
// 地图瓷砖精灵（经过验证的正确行号）
// ─────────────────────────────────────────────────────────────────
// TILE_SPRITE[tileType] = { sheet, srcX, srcY, srcW, srcH }
//
// terrains.png（32×1120，35行，单列）行号→颜色：
//   row 0  srcY=0   : 深灰(83,83,83)   = ground 石板地板
//   row 3  srcY=96  : 紫灰(174,171,196) = ground2 经典魔塔地板
//   row 4  srcY=128 : 灰(132,132,132)  = ground3
//   row 6  srcY=192 : 浅灰+楼梯图      = upFloor ↑
//   row 21 srcY=672 : 砖红(211,57,42)  = 经典魔塔砖墙
//
// animates.png（128×928，4帧/行，29行）各行srcX=0取第0帧：
//   row 1  srcY=32  : 红/岩浆            = lava → 陷阱
//   row 4  srcY=128 : 黄(217,166,132)   = yellowDoor
//   row 5  srcY=160 : 蓝(166,166,217)   = blueDoor
//   row 6  srcY=192 : 红(205,111,99)    = redDoor
//
// items.png（32×1984，62行，单列）：
//   row 0  srcY=0   : 黄钥匙(218,167,133)
//   row 1  srcY=32  : 蓝钥匙(167,167,218)
//   row 2  srcY=64  : 红钥匙(208,109,99)
//   row 20 srcY=640 : 红血瓶(223,183,195) = redPotion  小血瓶
//   row 21 srcY=672 : 蓝血瓶(194,194,223) = bluePotion 大血瓶
export const TILE_SPRITE = {
  // ─ 地板 & 墙壁 & 楼梯 (terrains.png) ─
  0:  { sheet:'terrains', srcX:0, srcY:96,  srcW:32, srcH:32 },  // 地板  row3 紫灰石板
  1:  { sheet:'terrains', srcX:0, srcY:672, srcW:32, srcH:32 },  // 砖墙  row21 红砖(经典魔塔)
  10: { sheet:'terrains', srcX:0, srcY:192, srcW:32, srcH:32 },  // 楼梯  row6 upFloor

  // ─ 门 (animates.png，取第0帧 srcX=0) ─
  2:  { sheet:'animates', srcX:0, srcY:128, srcW:32, srcH:32 },  // 黄门  row4
  3:  { sheet:'animates', srcX:0, srcY:160, srcW:32, srcH:32 },  // 蓝门  row5
  4:  { sheet:'animates', srcX:0, srcY:192, srcW:32, srcH:32 },  // 红门  row6

  // ─ 钥匙 (items.png) ─
  5:  { sheet:'items', srcX:0, srcY:0,   srcW:32, srcH:32 },  // 黄钥匙 row0 ✓
  6:  { sheet:'items', srcX:0, srcY:32,  srcW:32, srcH:32 },  // 蓝钥匙 row1 ✓ (修复：原为row2=红钥匙)
  7:  { sheet:'items', srcX:0, srcY:64,  srcW:32, srcH:32 },  // 红钥匙 row2 ✓ (修复：原为row4=钢钥匙)

  // ─ 血瓶 (items.png) ─
  12: { sheet:'items', srcX:0, srcY:640, srcW:32, srcH:32 },  // 小血瓶 row20 redPotion  ✓ (修复：原为row12=罗盘)
  13: { sheet:'items', srcX:0, srcY:672, srcW:32, srcH:32 },  // 大血瓶 row21 bluePotion ✓ (修复：原为row16=红宝石)

  // ─ 陷阱 (animates.png，岩浆行) ─
  15: { sheet:'animates', srcX:0, srcY:32,  srcW:32, srcH:32 },  // 刺陷阱 row1 lava 岩浆

  // ─ 事件触发点（渲染为普通地板，玩家看不见） ─
  16: { sheet:'terrains', srcX:0, srcY:96,  srcW:32, srcH:32 },  // EVENT 渲染为地板
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
