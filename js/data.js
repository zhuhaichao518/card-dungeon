/**
 * data.js - 完整游戏数据：20层魔塔 + 14种怪物 + 35张英雄卡
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 瓷砖类型
// ═══════════════════════════════════════════════════════════════════════════════
export const TILE = {
  FLOOR:0, WALL:1, DOOR_YELLOW:2, DOOR_BLUE:3, DOOR_RED:4,
  KEY_YELLOW:5, KEY_BLUE:6, KEY_RED:7,
  STAIRS:10, POTION_S:12, POTION_L:13, SPIKE_TRAP:15,
};

// ═══════════════════════════════════════════════════════════════════════════════
// 玩家初始属性
// ═══════════════════════════════════════════════════════════════════════════════
export const PLAYER_INIT = {
  hp: 70, maxHp: 70, shield: 0,
  maxAp: 3, handSize: 4,
};

// ═══════════════════════════════════════════════════════════════════════════════
// 英雄初始牌组（10张）
// ═══════════════════════════════════════════════════════════════════════════════
export const STARTER_DECK = [
  { id:'strike',  name:'打击', cost:1, type:'attack', value:6,  desc:'造成6点伤害' },
  { id:'strike',  name:'打击', cost:1, type:'attack', value:6,  desc:'造成6点伤害' },
  { id:'strike',  name:'打击', cost:1, type:'attack', value:6,  desc:'造成6点伤害' },
  { id:'defend',  name:'防御', cost:1, type:'skill',  value:5,  desc:'获得5点护盾' },
  { id:'defend',  name:'防御', cost:1, type:'skill',  value:5,  desc:'获得5点护盾' },
  { id:'power',   name:'强击', cost:2, type:'attack', value:11, desc:'造成11点伤害' },
  { id:'power',   name:'强击', cost:2, type:'attack', value:11, desc:'造成11点伤害' },
  { id:'ironwall',name:'铁壁', cost:2, type:'skill',  value:8,  desc:'获得8点护盾' },
  { id:'heavy',   name:'重斩', cost:3, type:'attack', value:18, desc:'造成18点伤害' },
  { id:'heal',    name:'包扎', cost:2, type:'skill',  value:8, isHeal:true, desc:'恢复8点生命' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 英雄奖励卡池（35张，分三个稀有度）
// ═══════════════════════════════════════════════════════════════════════════════
export const HERO_CARD_POOL = [
  // ── 普通 Common (1费为主) ─────────────────
  { id:'strike',    name:'打击',   cost:1, type:'attack', value:6,  rarity:'common', desc:'造成6点伤害' },
  { id:'defend',    name:'防御',   cost:1, type:'skill',  value:5,  rarity:'common', desc:'获得5点护盾' },
  { id:'quick',     name:'速击',   cost:1, type:'attack', value:3, hits:2, rarity:'common', desc:'造成3伤害×2' },
  { id:'counter',   name:'反击',   cost:1, type:'skill',  value:3, counterDmg:4, rarity:'common', desc:'获得3护盾，反弹4伤害' },
  { id:'poison_blade',name:'毒刃', cost:1, type:'attack', value:4, poison:3, rarity:'common', desc:'造成4伤害，施加3毒' },
  { id:'combo',     name:'连击',   cost:1, type:'attack', value:3, draw:1, rarity:'common', desc:'造成3伤害，摸1张' },
  { id:'spark',     name:'火花',   cost:1, type:'attack', value:4, burn:2, rarity:'common', desc:'造成4伤害，施加2灼烧' },
  { id:'parry',     name:'招架',   cost:1, type:'skill',  value:4, draw:1, rarity:'common', desc:'获得4护盾，摸1张' },
  { id:'bash',      name:'猛击',   cost:1, type:'attack', value:5, weakness:1, rarity:'common', desc:'造成5伤害，施加1虚弱' },
  { id:'heal_minor',name:'草药',   cost:1, type:'skill',  value:5, isHeal:true, rarity:'common', desc:'恢复5点生命' },

  // ── 罕见 Rare (2费为主) ───────────────────
  { id:'power',     name:'强击',   cost:2, type:'attack', value:11, rarity:'rare', desc:'造成11点伤害' },
  { id:'ironwall',  name:'铁壁',   cost:2, type:'skill',  value:8,  rarity:'rare', desc:'获得8点护盾' },
  { id:'heal',      name:'包扎',   cost:2, type:'skill',  value:8, isHeal:true, rarity:'rare', desc:'恢复8点生命' },
  { id:'fury',      name:'狂怒',   cost:2, type:'attack', value:7, hits:2, rarity:'rare', desc:'造成7伤害×2' },
  { id:'flame_sword',name:'烈焰剑',cost:2, type:'attack', value:8, burn:3, rarity:'rare', desc:'造成8伤害，施加3灼烧' },
  { id:'break_armor',name:'破甲',  cost:2, type:'attack', value:12, rarity:'rare', desc:'造成12点伤害' },
  { id:'venom_burst',name:'毒爆',  cost:2, type:'attack', value:8, poisonExploit:true, rarity:'rare', desc:'造成8伤害，中毒目标额外+毒层×2' },
  { id:'heal_big',  name:'大治愈', cost:2, type:'skill',  value:15,isHeal:true, rarity:'rare', desc:'恢复15点生命' },
  { id:'twin_strike',name:'双刺',  cost:2, type:'attack', value:5, hits:2, draw:1, rarity:'rare', desc:'造成5×2伤害，摸1张' },
  { id:'warcry',    name:'战吼',   cost:2, type:'skill',  value:0, strengthSelf:3, rarity:'rare', desc:'本回合攻击+3' },
  { id:'weaken',    name:'削弱术', cost:2, type:'skill',  value:6, weakness:2, rarity:'rare', desc:'获得6护盾，施加2虚弱（怪物伤害减半2回合）' },
  { id:'poison_mist',name:'毒雾',  cost:2, type:'attack', value:3, poison:5, rarity:'rare', desc:'造成3伤害，施加5毒' },
  { id:'fire_rain', name:'火雨',   cost:2, type:'attack', value:6, burn:4, rarity:'rare', desc:'造成6伤害，施加4灼烧' },
  { id:'bloodlust', name:'嗜血',   cost:2, type:'attack', value:10,isHeal:true, rarity:'rare', desc:'造成10伤害，恢复5HP（吸血）' },
  { id:'dodge',     name:'闪避',   cost:2, type:'skill',  value:10,draw:1, rarity:'rare', desc:'获得10护盾，摸1张' },

  // ── 史诗 Epic (3费为主) ───────────────────
  { id:'heavy',     name:'重斩',   cost:3, type:'attack', value:18,rarity:'epic', desc:'造成18点伤害' },
  { id:'fortress',  name:'坚守',   cost:3, type:'skill',  value:12,draw:1, rarity:'epic', desc:'获得12护盾，摸1张' },
  { id:'dragonslayer',name:'龙杀', cost:3, type:'attack', value:15,burnExploit:12, rarity:'epic', desc:'造成15伤害，灼烧目标额外+12' },
  { id:'holy_sword',name:'神圣剑', cost:3, type:'attack', value:14,rarity:'epic', desc:'造成14伤害，恢复5HP', isHeal:false },
  { id:'berserk',   name:'狂暴',   cost:3, type:'skill',  value:0, strengthSelf:5, rarity:'epic', desc:'本回合攻击+5' },
  { id:'perfect_block',name:'完美格挡',cost:3, type:'skill',value:18,draw:2, rarity:'epic', desc:'获得18护盾，摸2张' },
  { id:'massacre',  name:'屠杀',   cost:3, type:'attack', value:6, hits:3, rarity:'epic', desc:'造成6伤害×3' },
  { id:'venom_nova',name:'致命毒雾',cost:3, type:'attack', value:5, poison:8, rarity:'epic', desc:'造成5伤害，施加8毒' },
  { id:'inferno',   name:'炼狱火', cost:3, type:'attack', value:10,burn:6, rarity:'epic', desc:'造成10伤害，施加6灼烧' },
  { id:'lifesteal', name:'生命汲取',cost:3, type:'attack', value:12,rarity:'epic', desc:'造成12伤害，恢复8HP', isHeal:false },
];

// 给神圣剑和生命汲取加特殊属性
HERO_CARD_POOL.find(c=>c.id==='holy_sword').healOnHit = 5;
HERO_CARD_POOL.find(c=>c.id==='lifesteal').healOnHit = 8;
HERO_CARD_POOL.find(c=>c.id==='bloodlust').healOnHit = 5;
// 同时保持兼容
export const REWARD_CARD_POOL = HERO_CARD_POOL;

// ═══════════════════════════════════════════════════════════════════════════════
// 怪物定义（14种）
// ═══════════════════════════════════════════════════════════════════════════════

export const MONSTER_DEFS = {

  // ── 难度1：绿史莱姆（入门）──────────────────────────────────────────────
  slime_green: {
    id:'slime_green', name:'绿史莱姆', emoji:'🟢',
    hp:28, maxHp:28, maxAp:3, handSize:3,
    deck: [
      { id:'s_punch',name:'黏液拳',  cost:1, type:'attack',value:5, desc:'造成5伤害' },
      { id:'s_punch',name:'黏液拳',  cost:1, type:'attack',value:5, desc:'造成5伤害' },
      { id:'s_punch',name:'黏液拳',  cost:1, type:'attack',value:5, desc:'造成5伤害' },
      { id:'s_wall', name:'黏液壁',  cost:1, type:'skill', value:4, desc:'获得4护盾' },
      { id:'s_wall', name:'黏液壁',  cost:1, type:'skill', value:4, desc:'获得4护盾' },
      { id:'s_acid', name:'强酸',    cost:2, type:'attack',value:9, desc:'造成9伤害' },
      { id:'s_big',  name:'吞噬',    cost:3, type:'attack',value:14,desc:'造成14伤害' },
    ],
  },

  // ── 难度2：红史莱姆（灼烧入门）──────────────────────────────────────────
  slime_red: {
    id:'slime_red', name:'红史莱姆', emoji:'🔴',
    hp:35, maxHp:35, maxAp:3, handSize:3,
    deck: [
      { id:'r_punch',name:'灼热拳',  cost:1, type:'attack',value:4, burn:2, desc:'4伤害+2灼烧' },
      { id:'r_punch',name:'灼热拳',  cost:1, type:'attack',value:4, burn:2, desc:'4伤害+2灼烧' },
      { id:'r_punch',name:'灼热拳',  cost:1, type:'attack',value:4, burn:2, desc:'4伤害+2灼烧' },
      { id:'r_wall', name:'熔岩壁',  cost:1, type:'skill', value:5, desc:'获得5护盾' },
      { id:'r_wall', name:'熔岩壁',  cost:1, type:'skill', value:5, desc:'获得5护盾' },
      { id:'r_fire', name:'火球',    cost:2, type:'attack',value:8, burn:3, desc:'8伤害+3灼烧' },
      { id:'r_boom', name:'爆炸',    cost:3, type:'attack',value:12,burn:4, desc:'12伤害+4灼烧' },
    ],
  },

  // ── 难度2：蝙蝠（快攻，1费多）─────────────────────────────────────────
  bat: {
    id:'bat', name:'蝙蝠', emoji:'🦇',
    hp:22, maxHp:22, maxAp:3, handSize:4,
    deck: [
      { id:'b_bite',name:'咬击',  cost:1, type:'attack',value:4, desc:'造成4伤害' },
      { id:'b_bite',name:'咬击',  cost:1, type:'attack',value:4, desc:'造成4伤害' },
      { id:'b_bite',name:'咬击',  cost:1, type:'attack',value:4, desc:'造成4伤害' },
      { id:'b_bite',name:'咬击',  cost:1, type:'attack',value:4, desc:'造成4伤害' },
      { id:'b_flap',name:'扑翼',  cost:1, type:'skill', value:3, desc:'获得3护盾' },
      { id:'b_dive',name:'俯冲',  cost:2, type:'attack',value:7, hits:2, desc:'7伤害×2' },
      { id:'b_scr', name:'尖啸',  cost:1, type:'attack',value:3, weakness:1, desc:'3伤+虚弱1' },
    ],
  },

  // ── 难度3：骷髅兵（防御型）──────────────────────────────────────────────
  skeleton: {
    id:'skeleton', name:'骷髅兵', emoji:'💀',
    hp:40, maxHp:40, maxAp:3, handSize:3,
    deck: [
      { id:'sk_slash',name:'骨刃',  cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'sk_slash',name:'骨刃',  cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'sk_shield',name:'骨盾', cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'sk_shield',name:'骨盾', cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'sk_shield',name:'骨盾', cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'sk_heavy',name:'粉碎',  cost:2, type:'attack',value:10,desc:'造成10伤害' },
      { id:'sk_fort', name:'骨墙',  cost:2, type:'skill', value:12,desc:'获得12护盾' },
      { id:'sk_big',  name:'亡灵斩',cost:3, type:'attack',value:15,desc:'造成15伤害' },
    ],
  },

  // ── 难度3：哥布林（快节奏，摸牌多）─────────────────────────────────────
  goblin: {
    id:'goblin', name:'哥布林', emoji:'👺',
    hp:30, maxHp:30, maxAp:3, handSize:4,
    deck: [
      { id:'g_stab',name:'匕首',  cost:1, type:'attack',value:4, desc:'造成4伤害' },
      { id:'g_stab',name:'匕首',  cost:1, type:'attack',value:4, desc:'造成4伤害' },
      { id:'g_stab',name:'匕首',  cost:1, type:'attack',value:4, desc:'造成4伤害' },
      { id:'g_stab',name:'匕首',  cost:1, type:'attack',value:4, desc:'造成4伤害' },
      { id:'g_hide',name:'闪避',  cost:1, type:'skill', value:3, desc:'获得3护盾' },
      { id:'g_pois',name:'毒刺',  cost:1, type:'attack',value:3, poison:2, desc:'3伤+2毒' },
      { id:'g_rush',name:'突袭',  cost:2, type:'attack',value:8, desc:'造成8伤害' },
      { id:'g_big', name:'背刺',  cost:2, type:'attack',value:6, hits:2, desc:'6伤害×2' },
    ],
  },

  // ── 难度4：石像鬼（坦克，超高护盾）────────────────────────────────────
  gargoyle: {
    id:'gargoyle', name:'石像鬼', emoji:'🗿',
    hp:52, maxHp:52, maxAp:3, handSize:3,
    deck: [
      { id:'gar_claw',name:'石爪',    cost:1, type:'attack',value:5, desc:'造成5伤害' },
      { id:'gar_claw',name:'石爪',    cost:1, type:'attack',value:5, desc:'造成5伤害' },
      { id:'gar_wall',name:'石化皮肤',cost:1, type:'skill', value:7, desc:'获得7护盾' },
      { id:'gar_wall',name:'石化皮肤',cost:1, type:'skill', value:7, desc:'获得7护盾' },
      { id:'gar_wall',name:'石化皮肤',cost:1, type:'skill', value:7, desc:'获得7护盾' },
      { id:'gar_slam',name:'石锤',    cost:2, type:'attack',value:10,desc:'造成10伤害' },
      { id:'gar_fort',name:'石墙',    cost:2, type:'skill', value:14,desc:'获得14护盾' },
      { id:'gar_big', name:'地裂',    cost:3, type:'attack',value:16,desc:'造成16伤害' },
    ],
  },

  // ── 难度5：火焰魔（灼烧+高伤）─────────────────────────────────────────
  fire_demon: {
    id:'fire_demon', name:'火焰魔', emoji:'🔥',
    hp:45, maxHp:45, maxAp:3, handSize:3,
    deck: [
      { id:'fd_bolt',name:'火箭',  cost:1, type:'attack',value:5, burn:2, desc:'5伤+2灼烧' },
      { id:'fd_bolt',name:'火箭',  cost:1, type:'attack',value:5, burn:2, desc:'5伤+2灼烧' },
      { id:'fd_bolt',name:'火箭',  cost:1, type:'attack',value:5, burn:2, desc:'5伤+2灼烧' },
      { id:'fd_wall',name:'火盾',  cost:1, type:'skill', value:5, desc:'获得5护盾' },
      { id:'fd_fire',name:'烈焰',  cost:2, type:'attack',value:9, burn:3, desc:'9伤+3灼烧' },
      { id:'fd_fire',name:'烈焰',  cost:2, type:'attack',value:9, burn:3, desc:'9伤+3灼烧' },
      { id:'fd_inf', name:'地狱火',cost:3, type:'attack',value:14,burn:5, desc:'14伤+5灼烧' },
    ],
  },

  // ── 难度5：巫妖（毒+虚弱，控制型）───────────────────────────────────────
  lich: {
    id:'lich', name:'巫妖', emoji:'👻',
    hp:38, maxHp:38, maxAp:3, handSize:3,
    deck: [
      { id:'li_bolt',name:'暗箭',   cost:1, type:'attack',value:5, desc:'造成5伤害' },
      { id:'li_bolt',name:'暗箭',   cost:1, type:'attack',value:5, desc:'造成5伤害' },
      { id:'li_pois',name:'瘟疫',   cost:1, type:'attack',value:3, poison:4, desc:'3伤+4毒' },
      { id:'li_pois',name:'瘟疫',   cost:1, type:'attack',value:3, poison:4, desc:'3伤+4毒' },
      { id:'li_weak',name:'诅咒',   cost:1, type:'attack',value:3, weakness:2, desc:'3伤+2虚弱' },
      { id:'li_wall',name:'骨墙',   cost:2, type:'skill', value:8, desc:'获得8护盾' },
      { id:'li_big', name:'亡灵风暴',cost:3,type:'attack',value:12,poison:3,weakness:1, desc:'12伤+3毒+1虚弱' },
    ],
  },

  // ── 难度6：恶魔骑士（maxAp=4，高压）──────────────────────────────────────
  demon_knight: {
    id:'demon_knight', name:'恶魔骑士', emoji:'⚔️',
    hp:62, maxHp:62, maxAp:4, handSize:4,
    deck: [
      { id:'dk_slash',name:'魔剑',  cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'dk_slash',name:'魔剑',  cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'dk_slash',name:'魔剑',  cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'dk_def',  name:'魔铠',  cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'dk_def',  name:'魔铠',  cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'dk_heavy',name:'斩击',  cost:2, type:'attack',value:11,desc:'造成11伤害' },
      { id:'dk_heavy',name:'斩击',  cost:2, type:'attack',value:11,desc:'造成11伤害' },
      { id:'dk_fort', name:'暗盾',  cost:2, type:'skill', value:10,desc:'获得10护盾' },
      { id:'dk_big',  name:'地狱斩',cost:3, type:'attack',value:18,desc:'造成18伤害' },
    ],
  },

  // ── 难度7：火龙（灼烧+超高伤）───────────────────────────────────────────
  dragon: {
    id:'dragon', name:'火龙', emoji:'🐉',
    hp:72, maxHp:72, maxAp:4, handSize:4,
    deck: [
      { id:'dr_claw',name:'龙爪',  cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'dr_claw',name:'龙爪',  cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'dr_scale',name:'鳞甲', cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'dr_scale',name:'鳞甲', cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'dr_fire',name:'龙息',  cost:2, type:'attack',value:10,burn:4, desc:'10伤+4灼烧' },
      { id:'dr_fire',name:'龙息',  cost:2, type:'attack',value:10,burn:4, desc:'10伤+4灼烧' },
      { id:'dr_tail',name:'尾扫',  cost:2, type:'attack',value:8, hits:2, desc:'8伤害×2' },
      { id:'dr_rage',name:'龙怒',  cost:3, type:'attack',value:20,burn:5, desc:'20伤+5灼烧' },
    ],
  },

  // ── BOSS5：史莱姆王 ──────────────────────────────────────────────────────
  slime_king: {
    id:'slime_king', name:'史莱姆王', emoji:'👑',
    hp:95, maxHp:95, maxAp:3, handSize:4,
    deck: [
      { id:'sk_punch',name:'王拳',     cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'sk_punch',name:'王拳',     cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'sk_punch',name:'王拳',     cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'sk_wall', name:'分裂护盾', cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'sk_wall', name:'分裂护盾', cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'sk_acid', name:'腐蚀',     cost:2, type:'attack',value:9, poison:3, desc:'9伤+3毒' },
      { id:'sk_acid', name:'腐蚀',     cost:2, type:'attack',value:9, poison:3, desc:'9伤+3毒' },
      { id:'sk_fort', name:'硬化',     cost:2, type:'skill', value:12,desc:'获得12护盾' },
      { id:'sk_big',  name:'黏液海啸', cost:3, type:'attack',value:16,poison:4, desc:'16伤+4毒' },
    ],
  },

  // ── BOSS10：骷髅王 ──────────────────────────────────────────────────────
  skeleton_king: {
    id:'skeleton_king', name:'骷髅王', emoji:'💀',
    hp:115, maxHp:115, maxAp:4, handSize:4,
    deck: [
      { id:'skk_slash',name:'亡灵斩',  cost:1, type:'attack',value:7, desc:'造成7伤害' },
      { id:'skk_slash',name:'亡灵斩',  cost:1, type:'attack',value:7, desc:'造成7伤害' },
      { id:'skk_slash',name:'亡灵斩',  cost:1, type:'attack',value:7, desc:'造成7伤害' },
      { id:'skk_def',  name:'亡灵铠甲',cost:1, type:'skill', value:7, desc:'获得7护盾' },
      { id:'skk_def',  name:'亡灵铠甲',cost:1, type:'skill', value:7, desc:'获得7护盾' },
      { id:'skk_curse',name:'死亡诅咒',cost:2, type:'attack',value:10,weakness:2, desc:'10伤+2虚弱' },
      { id:'skk_summon',name:'召唤骨兵',cost:2, type:'skill',value:14,desc:'获得14护盾' },
      { id:'skk_heavy',name:'骨王斩',  cost:3, type:'attack',value:20,desc:'造成20伤害' },
      { id:'skk_big',  name:'死亡风暴',cost:3, type:'attack',value:15,poison:5,weakness:1,desc:'15伤+5毒+1虚弱' },
    ],
  },

  // ── BOSS15：大法师 ──────────────────────────────────────────────────────
  archmage: {
    id:'archmage', name:'大法师', emoji:'🧙‍♂️',
    hp:130, maxHp:130, maxAp:4, handSize:4,
    deck: [
      { id:'am_bolt', name:'魔弹',    cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'am_bolt', name:'魔弹',    cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'am_bolt', name:'魔弹',    cost:1, type:'attack',value:6, desc:'造成6伤害' },
      { id:'am_shield',name:'魔盾',   cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'am_shield',name:'魔盾',   cost:1, type:'skill', value:6, desc:'获得6护盾' },
      { id:'am_fire', name:'烈焰风暴',cost:2, type:'attack',value:10,burn:4, desc:'10伤+4灼烧' },
      { id:'am_ice',  name:'冰冻术',  cost:2, type:'attack',value:8, weakness:2, desc:'8伤+2虚弱' },
      { id:'am_drain',name:'法力汲取',cost:2, type:'attack',value:9, poison:3, desc:'9伤+3毒' },
      { id:'am_fort', name:'魔法壁垒',cost:3, type:'skill', value:18,desc:'获得18护盾' },
      { id:'am_big',  name:'天罚',    cost:3, type:'attack',value:22,burn:5,weakness:1,desc:'22伤+5灼烧+1虚弱' },
    ],
  },

  // ── BOSS20：龙神（最终Boss）──────────────────────────────────────────────
  dragon_god: {
    id:'dragon_god', name:'龙神', emoji:'🐲',
    hp:160, maxHp:160, maxAp:5, handSize:5,
    deck: [
      { id:'dg_claw',name:'神龙爪',  cost:1, type:'attack',value:8, desc:'造成8伤害' },
      { id:'dg_claw',name:'神龙爪',  cost:1, type:'attack',value:8, desc:'造成8伤害' },
      { id:'dg_claw',name:'神龙爪',  cost:1, type:'attack',value:8, desc:'造成8伤害' },
      { id:'dg_scale',name:'龙神鳞甲',cost:1,type:'skill', value:8, desc:'获得8护盾' },
      { id:'dg_scale',name:'龙神鳞甲',cost:1,type:'skill', value:8, desc:'获得8护盾' },
      { id:'dg_fire',name:'龙神吐息',cost:2, type:'attack',value:12,burn:5, desc:'12伤+5灼烧' },
      { id:'dg_fire',name:'龙神吐息',cost:2, type:'attack',value:12,burn:5, desc:'12伤+5灼烧' },
      { id:'dg_tail',name:'龙神尾击',cost:2, type:'attack',value:10,hits:2, desc:'10伤害×2' },
      { id:'dg_fort',name:'龙神护体',cost:3, type:'skill', value:20,desc:'获得20护盾' },
      { id:'dg_nova',name:'龙神降临',cost:4, type:'attack',value:30,burn:6,weakness:2,desc:'30伤+6灼烧+2虚弱' },
      { id:'dg_doom',name:'毁灭吐息',cost:5, type:'attack',value:40,burn:8,desc:'40伤+8灼烧' },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 20层地图数据（每层11×11）
// T = TILE 常量引用简写
// ═══════════════════════════════════════════════════════════════════════════════
const T = TILE;
const W=T.WALL, F=T.FLOOR, DY=T.DOOR_YELLOW, DB=T.DOOR_BLUE, DR=T.DOOR_RED;
const KY=T.KEY_YELLOW, KB=T.KEY_BLUE, KR=T.KEY_RED;
const ST=T.STAIRS, PS=T.POTION_S, PL=T.POTION_L, SP=T.SPIKE_TRAP;

export const FLOORS = [
  // ─── 第1层：新手教学 ─────────────────────────────────────────────────────
  // 1绿史莱姆，黄门+黄钥匙基础教学，简单路线
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,F,F,W,F,F,F,W],
      [W,F,F,F,W,F,W,F,PS,F,W],
      [W,F,W,F,W,F,DY,F,F,F,W],
      [W,KY,W,F,F,F,W,W,F,F,W],
      [W,F,F,F,W,F,F,F,F,F,W],
      [W,F,W,F,W,F,W,F,W,F,W],
      [W,F,W,F,F,F,W,F,W,F,W],
      [W,F,F,F,W,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[{defId:'slime_green',x:5,y:5}],
  },

  // ─── 第2层：红史莱姆+蝙蝠 ──────────────────────────────────────────────
  // 引入灼烧和快攻怪，两条路线可选
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,F,F,F,F,F,W],
      [W,F,W,F,W,F,W,W,F,PS,W],
      [W,F,W,F,F,F,F,W,F,F,W],
      [W,F,W,W,W,DY,F,W,W,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,F,W,W,W,F,W,F,W],
      [W,KY,F,F,F,F,W,F,W,F,W],
      [W,F,W,W,W,F,W,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[{defId:'slime_red',x:3,y:3},{defId:'bat',x:7,y:7}],
  },

  // ─── 第3层：蝙蝠+骷髅兵 ────────────────────────────────────────────────
  // 引入蓝钥匙，防御型怪物
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,F,F,W,F,KY,F,W],
      [W,F,W,W,F,F,W,F,W,F,W],
      [W,F,F,W,F,F,DY,F,W,F,W],
      [W,W,F,W,F,W,W,F,F,F,W],
      [W,F,F,F,F,F,F,F,W,F,W],
      [W,F,W,W,W,F,W,W,W,F,W],
      [W,F,F,F,W,F,F,F,KB,F,W],
      [W,W,W,F,W,F,W,W,W,DB,W],
      [W,PS,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[{defId:'bat',x:3,y:5},{defId:'skeleton',x:7,y:3}],
  },

  // ─── 第4层：哥布林×2+蝙蝠 ──────────────────────────────────────────────
  // 多怪多路线，资源取舍
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,F,F,F,F,KY,W],
      [W,F,W,F,W,F,W,W,F,F,W],
      [W,F,W,F,F,F,F,F,W,F,W],
      [W,F,W,W,W,DY,W,F,W,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,DY,W,W,F,W,W,F,W,W],
      [W,KY,F,F,W,F,W,PS,F,F,W],
      [W,F,W,F,W,F,W,F,W,F,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[{defId:'goblin',x:3,y:3},{defId:'goblin',x:7,y:7},{defId:'bat',x:5,y:5}],
  },

  // ─── 第5层：BOSS - 史莱姆王竞技场 ────────────────────────────────────────
  // 大房间，两只小史莱姆护卫+Boss
  {
    playerStart:{x:5,y:9},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,PS,F,F,F,PS,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,PS,F,F,F,PS,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,W,W,ST,W,W,W,W,W],
    ],
    monsters:[
      {defId:'slime_king',x:5,y:3},
      {defId:'slime_green',x:2,y:5},
      {defId:'slime_green',x:8,y:5},
    ],
  },

  // ─── 第6层：骷髅+石像鬼+哥布林 ───────────────────────────────────────
  // 三色门首次出现
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,KY,F,F,F,F,W],
      [W,F,W,F,W,F,W,W,F,W,W],
      [W,F,W,F,DY,F,F,F,F,F,W],
      [W,F,W,W,W,W,DB,W,W,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,F,W,F,W,F,W,W,W],
      [W,KB,F,F,W,F,W,F,F,KR,W],
      [W,F,W,F,W,F,W,W,F,F,W],
      [W,F,F,F,F,F,DR,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[{defId:'skeleton',x:3,y:3},{defId:'gargoyle',x:7,y:5},{defId:'goblin',x:3,y:7}],
  },

  // ─── 第7层：火焰魔+蝙蝠+哥布林 ──────────────────────────────────────
  // 灼烧机制核心关卡
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,F,F,W,F,PS,F,W],
      [W,F,W,W,W,F,W,F,W,F,W],
      [W,F,F,F,W,F,DY,F,W,F,W],
      [W,W,W,F,W,W,W,F,F,F,W],
      [W,KY,F,F,F,F,F,F,W,F,W],
      [W,W,W,F,W,F,W,W,W,F,W],
      [W,F,F,F,W,F,F,F,F,F,W],
      [W,F,W,W,W,F,W,W,W,F,W],
      [W,F,F,PS,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[{defId:'fire_demon',x:5,y:5},{defId:'bat',x:7,y:3},{defId:'goblin',x:3,y:7}],
  },

  // ─── 第8层：巫妖+火焰魔+石像鬼 ─────────────────────────────────────
  // 多状态效果挑战
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,KY,W,F,F,F,KB,F,W],
      [W,F,W,F,W,F,W,W,F,W,W],
      [W,F,W,F,DY,F,F,F,F,F,W],
      [W,F,F,F,W,W,W,DB,W,F,W],
      [W,W,W,F,F,F,F,F,W,F,W],
      [W,PS,W,F,W,F,W,F,W,F,W],
      [W,F,F,F,W,F,W,F,F,F,W],
      [W,F,W,W,W,F,W,W,W,F,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[{defId:'lich',x:5,y:5},{defId:'fire_demon',x:7,y:3},{defId:'gargoyle',x:3,y:7}],
  },

  // ─── 第9层：恶魔骑士+石像鬼×2+哥布林 ──────────────────────────────
  // 四怪超高压
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,F,F,KY,F,F,W],
      [W,F,W,F,W,F,W,F,W,F,W],
      [W,F,W,F,F,F,DY,F,W,F,W],
      [W,F,W,W,W,W,W,F,F,F,W],
      [W,F,F,F,F,F,F,F,W,PS,W],
      [W,W,DY,W,W,F,W,W,W,F,W],
      [W,KY,F,F,W,F,F,F,F,F,W],
      [W,F,W,F,W,F,W,W,W,F,W],
      [W,F,F,F,F,F,F,PS,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'demon_knight',x:5,y:5},
      {defId:'gargoyle',x:3,y:3},
      {defId:'gargoyle',x:7,y:7},
      {defId:'goblin',x:7,y:1},
    ],
  },

  // ─── 第10层：BOSS - 骷髅王大殿 ────────────────────────────────────────
  {
    playerStart:{x:5,y:9},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,PL,F,F,F,PL,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,PL,F,F,F,PL,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,W,W,ST,W,W,W,W,W],
    ],
    monsters:[
      {defId:'skeleton_king',x:5,y:3},
      {defId:'demon_knight',x:2,y:5},
      {defId:'demon_knight',x:8,y:5},
      {defId:'fire_demon',x:5,y:7},
    ],
  },

  // ─── 第11层：火龙+巫妖×2+哥布林 ──────────────────────────────────────
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,KB,F,F,F,F,W],
      [W,F,W,F,W,F,W,W,F,W,W],
      [W,F,W,F,DB,F,F,F,F,F,W],
      [W,F,W,W,W,F,W,W,W,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,F,W,SP,W,F,W,W,W],
      [W,F,F,F,W,F,W,F,F,PS,W],
      [W,F,W,F,W,F,W,W,F,F,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'dragon',x:5,y:3},
      {defId:'lich',x:3,y:7},
      {defId:'lich',x:7,y:7},
      {defId:'goblin',x:7,y:1},
    ],
  },

  // ─── 第12层：火龙×2+恶魔骑士+哥布林×2 ────────────────────────────────
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,KY,W,F,F,KR,F,F,W],
      [W,F,W,F,W,F,W,F,W,F,W],
      [W,F,W,F,DY,F,F,F,W,F,W],
      [W,F,W,W,W,W,DR,W,W,F,W],
      [W,F,F,F,SP,F,F,F,SP,F,W],
      [W,W,W,F,W,F,W,F,W,W,W],
      [W,F,F,F,W,F,W,F,F,F,W],
      [W,F,W,W,W,F,W,W,W,F,W],
      [W,F,F,PS,F,F,F,PS,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'dragon',x:3,y:5},
      {defId:'dragon',x:7,y:5},
      {defId:'demon_knight',x:5,y:3},
      {defId:'goblin',x:3,y:7},
      {defId:'goblin',x:7,y:7},
    ],
  },

  // ─── 第13层：恶魔骑士×2+巫妖×2+火焰魔 ─────────────────────────────
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,F,F,F,KY,F,W],
      [W,F,W,F,W,F,W,W,F,W,W],
      [W,F,W,F,F,F,DY,F,F,F,W],
      [W,F,W,W,W,SP,W,F,W,F,W],
      [W,F,F,F,F,F,F,F,W,F,W],
      [W,W,W,F,W,F,W,W,W,F,W],
      [W,F,F,F,W,F,F,F,F,F,W],
      [W,F,W,F,W,SP,W,W,F,F,W],
      [W,F,F,F,F,F,F,PS,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'demon_knight',x:3,y:3},
      {defId:'demon_knight',x:7,y:7},
      {defId:'lich',x:5,y:5},
      {defId:'lich',x:7,y:3},
      {defId:'fire_demon',x:3,y:7},
    ],
  },

  // ─── 第14层：火龙×2+恶魔骑士×2+石像鬼 ────────────────────────────────
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,DB,F,F,KB,F,F,W],
      [W,F,W,W,W,F,W,F,W,F,W],
      [W,F,F,F,F,F,W,F,W,F,W],
      [W,W,W,F,W,W,W,F,F,F,W],
      [W,F,F,F,SP,F,SP,F,W,F,W],
      [W,F,W,W,W,F,W,W,W,F,W],
      [W,F,F,F,W,F,F,F,F,F,W],
      [W,W,W,F,W,SP,W,W,F,F,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'dragon',x:3,y:3},
      {defId:'dragon',x:7,y:3},
      {defId:'demon_knight',x:3,y:7},
      {defId:'demon_knight',x:7,y:7},
      {defId:'gargoyle',x:5,y:5},
    ],
  },

  // ─── 第15层：BOSS - 大法师殿堂 ───────────────────────────────────────
  {
    playerStart:{x:5,y:9},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,PL,F,F,F,PL,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,PL,F,F,F,PL,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,W,W,ST,W,W,W,W,W],
    ],
    monsters:[
      {defId:'archmage',x:5,y:3},
      {defId:'demon_knight',x:2,y:5},
      {defId:'demon_knight',x:8,y:5},
      {defId:'demon_knight',x:5,y:7},
      {defId:'dragon',x:2,y:2},
    ],
  },

  // ─── 第16层：火龙×3+恶魔骑士×2 ──────────────────────────────────────
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,F,F,F,KY,F,W],
      [W,F,W,F,W,SP,W,F,W,F,W],
      [W,F,W,F,F,F,DY,F,F,F,W],
      [W,F,W,W,W,F,W,W,W,F,W],
      [W,F,F,F,SP,F,SP,F,F,F,W],
      [W,W,W,F,W,F,W,F,W,W,W],
      [W,F,F,F,W,F,W,F,F,F,W],
      [W,F,W,F,W,SP,W,F,W,F,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'dragon',x:5,y:3},
      {defId:'dragon',x:3,y:7},
      {defId:'dragon',x:7,y:7},
      {defId:'demon_knight',x:3,y:3},
      {defId:'demon_knight',x:7,y:3},
    ],
  },

  // ─── 第17层：火龙×2+巫妖×2+恶魔骑士×2 ─────────────────────────────
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,F,KR,F,F,F,W],
      [W,F,W,SP,W,F,W,W,F,W,W],
      [W,F,W,F,DR,F,F,F,F,F,W],
      [W,F,W,W,W,F,W,W,W,F,W],
      [W,F,F,F,SP,F,SP,F,F,F,W],
      [W,W,W,F,W,F,W,F,W,W,W],
      [W,F,F,F,W,F,W,F,F,PS,W],
      [W,F,W,F,W,SP,W,F,W,F,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'dragon',x:5,y:3},
      {defId:'dragon',x:5,y:7},
      {defId:'lich',x:3,y:5},
      {defId:'lich',x:7,y:5},
      {defId:'demon_knight',x:3,y:3},
      {defId:'demon_knight',x:7,y:7},
    ],
  },

  // ─── 第18层：火龙×4+恶魔骑士×2 ──────────────────────────────────────
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,F,F,F,F,F,W],
      [W,F,W,SP,W,SP,W,SP,W,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,F,W,F,W,F,W,W,W],
      [W,F,F,F,SP,F,SP,F,F,F,W],
      [W,F,W,F,W,F,W,F,W,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,F,W,SP,W,F,W,W,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'dragon',x:3,y:3},
      {defId:'dragon',x:7,y:3},
      {defId:'dragon',x:3,y:7},
      {defId:'dragon',x:7,y:7},
      {defId:'demon_knight',x:5,y:5},
      {defId:'demon_knight',x:5,y:1},
    ],
  },

  // ─── 第19层：恶魔骑士×4+火龙×2 ──────────────────────────────────────
  // 最后的守卫
  {
    playerStart:{x:1,y:1},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,W,F,F,F,F,F,W],
      [W,F,W,F,W,SP,W,F,W,F,W],
      [W,F,F,F,SP,F,SP,F,F,F,W],
      [W,W,W,F,W,F,W,F,W,W,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,W,F,W,SP,W,F,W,F,W],
      [W,F,F,F,SP,F,SP,F,F,F,W],
      [W,W,W,F,W,F,W,F,W,W,W],
      [W,F,F,F,F,F,F,F,F,ST,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[
      {defId:'demon_knight',x:3,y:3},
      {defId:'demon_knight',x:7,y:3},
      {defId:'demon_knight',x:3,y:7},
      {defId:'demon_knight',x:7,y:7},
      {defId:'dragon',x:5,y:3},
      {defId:'dragon',x:5,y:7},
    ],
  },

  // ─── 第20层：最终BOSS - 龙神殿 ────────────────────────────────────────
  {
    playerStart:{x:5,y:9},
    tiles:[
      [W,W,W,W,W,W,W,W,W,W,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,PL,F,F,F,PL,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,F,F,PL,F,F,F,PL,F,F,W],
      [W,F,F,F,F,F,F,F,F,F,W],
      [W,W,W,W,W,W,W,W,W,W,W],
    ],
    monsters:[{defId:'dragon_god',x:5,y:4}],
  },
];

// DATA_COMPLETE
