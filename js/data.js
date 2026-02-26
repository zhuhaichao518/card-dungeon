/**
 * data.js - Card Dungeon 50层魔塔数据
 */

export const TILE = {
  FLOOR:0, WALL:1, DOOR_YELLOW:2, DOOR_BLUE:3, DOOR_RED:4,
  KEY_YELLOW:5, KEY_BLUE:6, KEY_RED:7,
  STAIRS:10, POTION_S:12, POTION_L:13, SPIKE_TRAP:15, EVENT:16,
};

export const PLAYER_INIT = {
  hp: 80, maxHp: 80, shield: 0,
  maxAp: 3, handSize: 4,
};

export const STARTER_DECK = [
  { id:'strike',   name:'打击',   cost:1, type:'attack', value:6,  desc:'造成6点伤害' },
  { id:'strike',   name:'打击',   cost:1, type:'attack', value:6,  desc:'造成6点伤害' },
  { id:'strike',   name:'打击',   cost:1, type:'attack', value:6,  desc:'造成6点伤害' },
  { id:'defend',   name:'防御',   cost:1, type:'skill',  value:5,  desc:'获得5点护盾' },
  { id:'defend',   name:'防御',   cost:1, type:'skill',  value:5,  desc:'获得5点护盾' },
  { id:'power',    name:'强击',   cost:2, type:'attack', value:11, desc:'造成11点伤害' },
  { id:'power',    name:'强击',   cost:2, type:'attack', value:11, desc:'造成11点伤害' },
  { id:'ironwall', name:'铁壁',   cost:2, type:'skill',  value:8,  desc:'获得8点护盾' },
  { id:'heavy',    name:'重斩',   cost:3, type:'attack', value:18, desc:'造成18点伤害' },
  { id:'heal',     name:'包扎',   cost:2, type:'skill',  value:8, isHeal:true, desc:'恢复8点生命' },
];

export const HERO_CARD_POOL = [
  { id:'strike',      name:'打击',    cost:1, type:'attack', value:6,  rarity:'common', desc:'造成6点伤害' },
  { id:'defend',      name:'防御',    cost:1, type:'skill',  value:5,  rarity:'common', desc:'获得5点护盾' },
  { id:'quick',       name:'速击',    cost:1, type:'attack', value:3, hits:2, rarity:'common', desc:'造成3×2点伤害' },
  { id:'poison_blade',name:'毒刃',    cost:1, type:'attack', value:4, poison:3, rarity:'common', desc:'造成4伤害+3毒' },
  { id:'combo',       name:'连击',    cost:1, type:'attack', value:3, draw:1, rarity:'common', desc:'造成3伤害，摸1张' },
  { id:'spark',       name:'火花',    cost:1, type:'attack', value:4, burn:2, rarity:'common', desc:'造成4伤害+2灼烧' },
  { id:'parry',       name:'招架',    cost:1, type:'skill',  value:4, draw:1, rarity:'common', desc:'获得4护盾，摸1张' },
  { id:'bash',        name:'猛击',    cost:1, type:'attack', value:5, weakness:1, rarity:'common', desc:'造成5伤害+1虚弱' },
  { id:'heal_minor',  name:'草药',    cost:1, type:'skill',  value:5, isHeal:true, rarity:'common', desc:'恢复5点生命' },
  { id:'power',       name:'强击',    cost:2, type:'attack', value:11, rarity:'rare', desc:'造成11点伤害' },
  { id:'ironwall',    name:'铁壁',    cost:2, type:'skill',  value:8,  rarity:'rare', desc:'获得8点护盾' },
  { id:'heal',        name:'包扎',    cost:2, type:'skill',  value:8, isHeal:true, rarity:'rare', desc:'恢复8点生命' },
  { id:'fury',        name:'狂怒',    cost:2, type:'attack', value:7, hits:2, rarity:'rare', desc:'造成7×2点伤害' },
  { id:'flame_sword', name:'烈焰剑',  cost:2, type:'attack', value:8, burn:3, rarity:'rare', desc:'造成8伤害+3灼烧' },
  { id:'venom_burst', name:'毒爆',    cost:2, type:'attack', value:8, poisonExploit:true, rarity:'rare', desc:'造成8伤害，中毒目标额外受毒层×2伤害' },
  { id:'heal_big',    name:'大治愈',  cost:2, type:'skill',  value:15, isHeal:true, rarity:'rare', desc:'恢复15点生命' },
  { id:'twin_strike', name:'双刺',    cost:2, type:'attack', value:5, hits:2, draw:1, rarity:'rare', desc:'造成5×2伤害，摸1张' },
  { id:'warcry',      name:'战吼',    cost:2, type:'skill',  value:0, strengthSelf:3, rarity:'rare', desc:'本回合攻击+3' },
  { id:'weaken',      name:'削弱术',  cost:2, type:'skill',  value:6, weakness:2, rarity:'rare', desc:'获得6护盾，施加2虚弱' },
  { id:'poison_mist', name:'毒雾',    cost:2, type:'attack', value:3, poison:5, rarity:'rare', desc:'造成3伤害+5毒' },
  { id:'bloodlust',   name:'嗜血',    cost:2, type:'attack', value:10, healOnHit:5, rarity:'rare', desc:'造成10伤害，恢复5HP' },
  { id:'dodge',       name:'闪避',    cost:2, type:'skill',  value:10, draw:1, rarity:'rare', desc:'获得10护盾，摸1张' },
  { id:'break_armor', name:'破甲',    cost:2, type:'attack', value:12, rarity:'rare', desc:'造成12点伤害' },
  { id:'heavy',       name:'重斩',    cost:3, type:'attack', value:18, rarity:'epic', desc:'造成18点伤害' },
  { id:'fortress',    name:'坚守',    cost:3, type:'skill',  value:12, draw:1, rarity:'epic', desc:'获得12护盾，摸1张' },
  { id:'dragonslayer',name:'龙杀',    cost:3, type:'attack', value:15, burnExploit:12, rarity:'epic', desc:'造成15伤害，灼烧目标额外+12' },
  { id:'holy_sword',  name:'神圣剑',  cost:3, type:'attack', value:14, healOnHit:5, rarity:'epic', desc:'造成14伤害，恢复5HP' },
  { id:'berserk',     name:'狂暴',    cost:3, type:'skill',  value:0, strengthSelf:5, rarity:'epic', desc:'本回合攻击+5' },
  { id:'perfect_block',name:'完美格挡',cost:3,type:'skill',  value:18, draw:2, rarity:'epic', desc:'获得18护盾，摸2张' },
  { id:'massacre',    name:'屠杀',    cost:3, type:'attack', value:6, hits:3, rarity:'epic', desc:'造成6×3点伤害' },
  { id:'venom_nova',  name:'致命毒雾',cost:3, type:'attack', value:5, poison:8, rarity:'epic', desc:'造成5伤害+8毒' },
  { id:'inferno',     name:'炼狱火',  cost:3, type:'attack', value:10, burn:6, rarity:'epic', desc:'造成10伤害+6灼烧' },
  { id:'lifesteal',   name:'生命汲取',cost:3, type:'attack', value:12, healOnHit:8, rarity:'epic', desc:'造成12伤害，恢复8HP' },
  { id:'quick_draw',  name:'快速过牌',cost:2, type:'skill',  draw:2, rarity:'rare',   desc:'摸2张牌' },
  { id:'deep_draw',   name:'深度汲取',cost:3, type:'skill',  draw:3, rarity:'epic',   desc:'摸3张牌' },
];
export const REWARD_CARD_POOL = HERO_CARD_POOL;

export const MONSTER_DEFS = {
  // ── 普通怪物 ──
  slime_green: {
    id:'slime_green', name:'绿史莱姆', emoji:'🟢',
    hp:28, maxHp:28, maxAp:3, handSize:3,
    deck:[
      {id:'s_punch',name:'黏液拳',cost:1,type:'attack',value:5,desc:'造成5伤害'},
      {id:'s_punch',name:'黏液拳',cost:1,type:'attack',value:5,desc:'造成5伤害'},
      {id:'s_punch',name:'黏液拳',cost:1,type:'attack',value:5,desc:'造成5伤害'},
      {id:'s_wall',name:'黏液壁',cost:1,type:'skill',value:4,desc:'获得4护盾'},
      {id:'s_wall',name:'黏液壁',cost:1,type:'skill',value:4,desc:'获得4护盾'},
      {id:'s_acid',name:'强酸',cost:2,type:'attack',value:9,desc:'造成9伤害'},
      {id:'s_big',name:'吞噬',cost:3,type:'attack',value:14,desc:'造成14伤害'},
    ],
  },
  slime_red: {
    id:'slime_red', name:'红史莱姆', emoji:'🔴',
    hp:35, maxHp:35, maxAp:3, handSize:3,
    deck:[
      {id:'r_punch',name:'灼热拳',cost:1,type:'attack',value:4,burn:2,desc:'4伤+2灼烧'},
      {id:'r_punch',name:'灼热拳',cost:1,type:'attack',value:4,burn:2,desc:'4伤+2灼烧'},
      {id:'r_punch',name:'灼热拳',cost:1,type:'attack',value:4,burn:2,desc:'4伤+2灼烧'},
      {id:'r_wall',name:'熔岩壁',cost:1,type:'skill',value:5,desc:'获得5护盾'},
      {id:'r_fire',name:'火球',cost:2,type:'attack',value:8,burn:3,desc:'8伤+3灼烧'},
      {id:'r_boom',name:'爆炸',cost:3,type:'attack',value:12,burn:4,desc:'12伤+4灼烧'},
    ],
  },
  bat: {
    id:'bat', name:'蝙蝠', emoji:'🦇',
    hp:22, maxHp:22, maxAp:3, handSize:4,
    deck:[
      {id:'b_bite',name:'咬击',cost:1,type:'attack',value:4,desc:'造成4伤害'},
      {id:'b_bite',name:'咬击',cost:1,type:'attack',value:4,desc:'造成4伤害'},
      {id:'b_bite',name:'咬击',cost:1,type:'attack',value:4,desc:'造成4伤害'},
      {id:'b_flap',name:'扑翼',cost:1,type:'skill',value:3,desc:'获得3护盾'},
      {id:'b_dive',name:'俯冲',cost:2,type:'attack',value:7,hits:2,desc:'7×2伤害'},
      {id:'b_scr',name:'尖啸',cost:1,type:'attack',value:3,weakness:1,desc:'3伤+虚弱1'},
    ],
  },
  skeleton: {
    id:'skeleton', name:'骷髅兵', emoji:'💀',
    hp:40, maxHp:40, maxAp:3, handSize:3,
    deck:[
      {id:'sk_slash',name:'骨刃',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'sk_slash',name:'骨刃',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'sk_shield',name:'骨盾',cost:1,type:'skill',value:6,desc:'获得6护盾'},
      {id:'sk_shield',name:'骨盾',cost:1,type:'skill',value:6,desc:'获得6护盾'},
      {id:'sk_heavy',name:'粉碎',cost:2,type:'attack',value:10,desc:'造成10伤害'},
      {id:'sk_fort',name:'骨墙',cost:2,type:'skill',value:12,desc:'获得12护盾'},
      {id:'sk_big',name:'亡灵斩',cost:3,type:'attack',value:15,desc:'造成15伤害'},
    ],
  },
  goblin: {
    id:'goblin', name:'哥布林', emoji:'👺',
    hp:30, maxHp:30, maxAp:3, handSize:4,
    deck:[
      {id:'g_stab',name:'匕首',cost:1,type:'attack',value:4,desc:'造成4伤害'},
      {id:'g_stab',name:'匕首',cost:1,type:'attack',value:4,desc:'造成4伤害'},
      {id:'g_stab',name:'匕首',cost:1,type:'attack',value:4,desc:'造成4伤害'},
      {id:'g_pois',name:'毒刺',cost:1,type:'attack',value:3,poison:2,desc:'3伤+2毒'},
      {id:'g_rush',name:'突袭',cost:2,type:'attack',value:8,desc:'造成8伤害'},
      {id:'g_big',name:'背刺',cost:2,type:'attack',value:6,hits:2,desc:'6×2伤害'},
    ],
  },
  gargoyle: {
    id:'gargoyle', name:'石像鬼', emoji:'🗿',
    hp:52, maxHp:52, maxAp:3, handSize:3,
    deck:[
      {id:'gar_claw',name:'石爪',cost:1,type:'attack',value:5,desc:'造成5伤害'},
      {id:'gar_claw',name:'石爪',cost:1,type:'attack',value:5,desc:'造成5伤害'},
      {id:'gar_wall',name:'石化皮肤',cost:1,type:'skill',value:7,desc:'获得7护盾'},
      {id:'gar_wall',name:'石化皮肤',cost:1,type:'skill',value:7,desc:'获得7护盾'},
      {id:'gar_slam',name:'石锤',cost:2,type:'attack',value:10,desc:'造成10伤害'},
      {id:'gar_fort',name:'石墙',cost:2,type:'skill',value:14,desc:'获得14护盾'},
      {id:'gar_big',name:'地裂',cost:3,type:'attack',value:16,desc:'造成16伤害'},
    ],
  },
  fire_demon: {
    id:'fire_demon', name:'火焰魔', emoji:'🔥',
    hp:45, maxHp:45, maxAp:3, handSize:3,
    deck:[
      {id:'fd_bolt',name:'火箭',cost:1,type:'attack',value:5,burn:2,desc:'5伤+2灼烧'},
      {id:'fd_bolt',name:'火箭',cost:1,type:'attack',value:5,burn:2,desc:'5伤+2灼烧'},
      {id:'fd_wall',name:'火盾',cost:1,type:'skill',value:5,desc:'获得5护盾'},
      {id:'fd_fire',name:'烈焰',cost:2,type:'attack',value:9,burn:3,desc:'9伤+3灼烧'},
      {id:'fd_fire',name:'烈焰',cost:2,type:'attack',value:9,burn:3,desc:'9伤+3灼烧'},
      {id:'fd_inf',name:'地狱火',cost:3,type:'attack',value:14,burn:5,desc:'14伤+5灼烧'},
    ],
  },
  lich: {
    id:'lich', name:'巫妖', emoji:'👻',
    hp:38, maxHp:38, maxAp:3, handSize:3,
    deck:[
      {id:'li_bolt',name:'暗箭',cost:1,type:'attack',value:5,desc:'造成5伤害'},
      {id:'li_bolt',name:'暗箭',cost:1,type:'attack',value:5,desc:'造成5伤害'},
      {id:'li_pois',name:'瘟疫',cost:1,type:'attack',value:3,poison:4,desc:'3伤+4毒'},
      {id:'li_weak',name:'诅咒',cost:1,type:'attack',value:3,weakness:2,desc:'3伤+2虚弱'},
      {id:'li_wall',name:'骨墙',cost:2,type:'skill',value:8,desc:'获得8护盾'},
      {id:'li_big',name:'亡灵风暴',cost:3,type:'attack',value:12,poison:3,weakness:1,desc:'12伤+3毒+1虚弱'},
    ],
  },
  demon_knight: {
    id:'demon_knight', name:'恶魔骑士', emoji:'⚔️',
    hp:62, maxHp:62, maxAp:4, handSize:4,
    deck:[
      {id:'dk_slash',name:'魔剑',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'dk_slash',name:'魔剑',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'dk_def',name:'魔铠',cost:1,type:'skill',value:6,desc:'获得6护盾'},
      {id:'dk_heavy',name:'斩击',cost:2,type:'attack',value:11,desc:'造成11伤害'},
      {id:'dk_heavy',name:'斩击',cost:2,type:'attack',value:11,desc:'造成11伤害'},
      {id:'dk_fort',name:'暗盾',cost:2,type:'skill',value:10,desc:'获得10护盾'},
      {id:'dk_big',name:'地狱斩',cost:3,type:'attack',value:18,desc:'造成18伤害'},
    ],
  },
  dragon: {
    id:'dragon', name:'火龙', emoji:'🐉',
    hp:72, maxHp:72, maxAp:4, handSize:4,
    deck:[
      {id:'dr_claw',name:'龙爪',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'dr_claw',name:'龙爪',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'dr_scale',name:'鳞甲',cost:1,type:'skill',value:6,desc:'获得6护盾'},
      {id:'dr_fire',name:'龙息',cost:2,type:'attack',value:10,burn:4,desc:'10伤+4灼烧'},
      {id:'dr_tail',name:'尾扫',cost:2,type:'attack',value:8,hits:2,desc:'8×2伤害'},
      {id:'dr_rage',name:'龙怒',cost:3,type:'attack',value:20,burn:5,desc:'20伤+5灼烧'},
    ],
  },
  // ── 魔王四使（剧情用，极强） ──
  general_red: {
    id:'general_red', name:'赤甲将军', emoji:'🔴',
    hp:9999, maxHp:9999, maxAp:5, handSize:5, scripted_loss:true,
    deck:[
      {id:'gen_kill',name:'必杀斩',cost:0,type:'attack',value:200,desc:'无法抵挡的斩击'},
      {id:'gen_kill',name:'必杀斩',cost:0,type:'attack',value:200,desc:'无法抵挡的斩击'},
      {id:'gen_kill',name:'必杀斩',cost:0,type:'attack',value:200,desc:'无法抵挡的斩击'},
      {id:'gen_shield',name:'铁壁防御',cost:0,type:'skill',value:999,desc:'坚不可摧的防御'},
      {id:'gen_shield',name:'铁壁防御',cost:0,type:'skill',value:999,desc:'坚不可摧的防御'},
    ],
  },
  // ── 普通BOSS ──
  slime_king: {
    id:'slime_king', name:'史莱姆王', emoji:'👑',
    hp:95, maxHp:95, maxAp:3, handSize:4,
    deck:[
      {id:'sk2_punch',name:'王拳',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'sk2_punch',name:'王拳',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'sk2_wall',name:'分裂护盾',cost:1,type:'skill',value:6,desc:'获得6护盾'},
      {id:'sk2_acid',name:'腐蚀',cost:2,type:'attack',value:9,poison:3,desc:'9伤+3毒'},
      {id:'sk2_fort',name:'硬化',cost:2,type:'skill',value:12,desc:'获得12护盾'},
      {id:'sk2_big',name:'黏液海啸',cost:3,type:'attack',value:16,poison:4,desc:'16伤+4毒'},
    ],
  },
  skeleton_king: {
    id:'skeleton_king', name:'骷髅王', emoji:'💀',
    hp:115, maxHp:115, maxAp:4, handSize:4,
    deck:[
      {id:'skk_slash',name:'亡灵斩',cost:1,type:'attack',value:7,desc:'造成7伤害'},
      {id:'skk_slash',name:'亡灵斩',cost:1,type:'attack',value:7,desc:'造成7伤害'},
      {id:'skk_def',name:'亡灵铠甲',cost:1,type:'skill',value:7,desc:'获得7护盾'},
      {id:'skk_curse',name:'死亡诅咒',cost:2,type:'attack',value:10,weakness:2,desc:'10伤+2虚弱'},
      {id:'skk_summon',name:'召唤骨兵',cost:2,type:'skill',value:14,desc:'获得14护盾'},
      {id:'skk_heavy',name:'骨王斩',cost:3,type:'attack',value:20,desc:'造成20伤害'},
    ],
  },
  archmage: {
    id:'archmage', name:'大法师', emoji:'🧙',
    hp:130, maxHp:130, maxAp:4, handSize:4,
    deck:[
      {id:'am_bolt',name:'魔弹',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'am_bolt',name:'魔弹',cost:1,type:'attack',value:6,desc:'造成6伤害'},
      {id:'am_shield',name:'魔盾',cost:1,type:'skill',value:6,desc:'获得6护盾'},
      {id:'am_fire',name:'烈焰风暴',cost:2,type:'attack',value:10,burn:4,desc:'10伤+4灼烧'},
      {id:'am_ice',name:'冰冻术',cost:2,type:'attack',value:8,weakness:2,desc:'8伤+2虚弱'},
      {id:'am_fort',name:'魔法壁垒',cost:3,type:'skill',value:18,desc:'获得18护盾'},
      {id:'am_big',name:'天罚',cost:3,type:'attack',value:22,burn:5,weakness:1,desc:'22伤+5灼烧+1虚弱'},
    ],
  },
  dragon_god: {
    id:'dragon_god', name:'魔王', emoji:'👹',
    hp:200, maxHp:200, maxAp:5, handSize:5,
    deck:[
      {id:'dg_claw',name:'魔爪',cost:1,type:'attack',value:8,desc:'造成8伤害'},
      {id:'dg_claw',name:'魔爪',cost:1,type:'attack',value:8,desc:'造成8伤害'},
      {id:'dg_scale',name:'魔王护体',cost:1,type:'skill',value:8,desc:'获得8护盾'},
      {id:'dg_scale',name:'魔王护体',cost:1,type:'skill',value:8,desc:'获得8护盾'},
      {id:'dg_fire',name:'黑焰',cost:2,type:'attack',value:12,burn:5,desc:'12伤+5灼烧'},
      {id:'dg_fire',name:'黑焰',cost:2,type:'attack',value:12,burn:5,desc:'12伤+5灼烧'},
      {id:'dg_tail',name:'魔王尾击',cost:2,type:'attack',value:10,hits:2,desc:'10×2伤害'},
      {id:'dg_fort',name:'魔王之力',cost:3,type:'skill',value:20,desc:'获得20护盾'},
      {id:'dg_nova',name:'毁灭降临',cost:4,type:'attack',value:30,burn:6,weakness:2,desc:'30伤+6灼烧+2虚弱'},
      {id:'dg_doom',name:'黑暗审判',cost:5,type:'attack',value:45,burn:8,desc:'45伤+8灼烧'},
    ],
  },
  // ── 监狱守卫（弱，玩家逃狱时打） ──
  prison_guard: {
    id:'prison_guard', name:'疲倦守卫', emoji:'😴',
    hp:15, maxHp:15, maxAp:2, handSize:2,
    deck:[
      {id:'pg_hit',name:'木棍',cost:1,type:'attack',value:3,desc:'造成3伤害'},
      {id:'pg_hit',name:'木棍',cost:1,type:'attack',value:3,desc:'造成3伤害'},
      {id:'pg_block',name:'躲避',cost:1,type:'skill',value:2,desc:'获得2护盾'},
    ],
  },
};

export const FLOORS = [
  { // Floor 1
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 5, 0, 0, 0, 0, 0,10, 1],
      [ 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [ 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 1,12, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'slime_green',x:5,y:3},{defId:'slime_green',x:7,y:7}]
  },
  { // Floor 2
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 5, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0,12, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'bat',x:3,y:3},{defId:'bat',x:7,y:7},{defId:'slime_green',x:5,y:1}]
  },
  { // Floor 3
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1,16, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'skeleton',x:3,y:3},{defId:'skeleton',x:7,y:3}],
    storyEvent:'ambush'
  },
  { // Floor 4
    playerStart:{x:2,y:8},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 0,10, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 5, 0, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'prison_guard',x:4,y:8}],
    storyEvent:'prison'
  },
  { // Floor 5
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 0, 0,10, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1, 5, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'goblin',x:5,y:3},{defId:'slime_green',x:3,y:7}]
  },
  { // Floor 6
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1,10, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 5, 0, 0,12, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'bat',x:5,y:3},{defId:'goblin',x:7,y:5}]
  },
  { // Floor 7
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 1,12, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'skeleton',x:3,y:5},{defId:'skeleton',x:7,y:5},{defId:'slime_red',x:5,y:7}]
  },
  { // Floor 8
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 6, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 3, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 5, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'gargoyle',x:5,y:5},{defId:'bat',x:7,y:3}]
  },
  { // Floor 9
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0,12, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'skeleton',x:3,y:3},{defId:'goblin',x:7,y:3},{defId:'slime_red',x:5,y:5}]
  },
  { // Floor 10
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,12, 0, 0, 0,12, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0,13, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,12, 0, 0, 0,12, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'slime_king',x:5,y:5}]
  },
  { // Floor 11
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 2, 0, 1, 1, 1, 0, 2, 0, 1],
      [ 1, 0, 0, 0, 1, 6, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 5, 0, 0, 0, 5, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'skeleton',x:3,y:3},{defId:'skeleton',x:7,y:3},{defId:'gargoyle',x:5,y:7}]
  },
  { // Floor 12
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 6, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0,12, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'slime_red',x:3,y:5},{defId:'slime_red',x:7,y:5},{defId:'goblin',x:5,y:3}]
  },
  { // Floor 13
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 2, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 1, 5, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'fire_demon',x:5,y:5},{defId:'skeleton',x:7,y:3}]
  },
  { // Floor 14
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 2, 0, 1, 3, 1, 0, 2, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 6, 0,12, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1,10, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'gargoyle',x:5,y:3},{defId:'lich',x:3,y:7},{defId:'skeleton',x:7,y:7}]
  },
  { // Floor 15
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,13, 0, 0, 0,13, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,12, 0, 0, 0,12, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'skeleton_king',x:5,y:5}]
  },
  { // Floor 16
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 3, 0, 1, 1, 1, 0, 3, 0, 1],
      [ 1, 0, 0, 0, 1, 5, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0,12, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'fire_demon',x:3,y:3},{defId:'fire_demon',x:7,y:3},{defId:'lich',x:5,y:5}]
  },
  { // Floor 17
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1, 6, 0, 0, 0, 6, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 4, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 7, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'gargoyle',x:3,y:5},{defId:'gargoyle',x:7,y:5},{defId:'fire_demon',x:5,y:3}]
  },
  { // Floor 18
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0,10, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 2, 0, 1, 0, 1, 0, 3, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 5, 0, 0, 0, 6, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'lich',x:5,y:5},{defId:'demon_knight',x:7,y:3},{defId:'fire_demon',x:3,y:7}]
  },
  { // Floor 19
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1,12, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'demon_knight',x:3,y:3},{defId:'demon_knight',x:7,y:3},{defId:'lich',x:5,y:7}]
  },
  { // Floor 20
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,13, 0, 0, 0,13, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,12, 0, 0, 0,12, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'archmage',x:5,y:5}]
  },
  { // Floor 21
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 1, 1, 0, 3, 0, 1],
      [ 1, 0, 0, 0, 1, 6, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0,12, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'demon_knight',x:5,y:5},{defId:'fire_demon',x:3,y:3},{defId:'lich',x:7,y:7}]
  },
  { // Floor 22
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1,10, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1],
      [ 1, 0, 2, 0, 1, 0, 1, 0, 4, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 5, 0,12, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:3},{defId:'gargoyle',x:3,y:5}]
  },
  { // Floor 23
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 3, 0, 1,12, 1, 0, 4, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 6, 0, 0, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'demon_knight',x:5,y:5},{defId:'fire_demon',x:3,y:3},{defId:'fire_demon',x:7,y:3}]
  },
  { // Floor 24
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1],
      [ 1, 0, 3, 0, 1, 0, 1, 0, 3, 0, 1],
      [ 1, 0, 1, 0, 1,15, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 6, 0,12, 0, 6, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'lich',x:3,y:3},{defId:'lich',x:7,y:3},{defId:'dragon',x:5,y:7}]
  },
  { // Floor 25
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1,13, 0, 0, 0,13, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 0, 1, 0, 4, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'demon_knight',x:5,y:5},{defId:'dragon',x:3,y:3}]
  },
  { // Floor 26
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 1, 1, 0, 3, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1,15, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 6, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'fire_demon',x:5,y:5},{defId:'demon_knight',x:7,y:3},{defId:'lich',x:3,y:7}]
  },
  { // Floor 27
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 4, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 7, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0,12, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:3,y:3},{defId:'dragon',x:7,y:3},{defId:'demon_knight',x:5,y:7}]
  },
  { // Floor 28
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0,10, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 3, 0, 1,15, 1, 0, 4, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 6, 0, 0, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'lich',x:5,y:5},{defId:'demon_knight',x:3,y:3},{defId:'fire_demon',x:7,y:7}]
  },
  { // Floor 29
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0,12, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 4, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 7, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'demon_knight',x:3,y:3},{defId:'demon_knight',x:7,y:3}]
  },
  { // Floor 30
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,13, 0, 0, 0,13, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,12, 0, 0, 0,12, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,13, 0, 0, 0,13, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5}]
  },
  { // Floor 31
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 3, 1, 0, 4, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1,15, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0,12, 0, 6, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:3},{defId:'demon_knight',x:3,y:5},{defId:'demon_knight',x:7,y:5}]
  },
  { // Floor 32
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 4, 1, 4, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0,12, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'lich',x:3,y:7},{defId:'lich',x:7,y:7}]
  },
  { // Floor 33
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1,15, 1, 0, 3, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 6, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'fire_demon',x:5,y:3},{defId:'dragon',x:3,y:7},{defId:'demon_knight',x:7,y:7}]
  },
  { // Floor 34
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1,13, 0, 0, 0,13, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 4, 1, 0, 1, 0, 1],
      [ 1, 0, 3, 0, 1, 0, 1, 0, 3, 0, 1],
      [ 1, 0, 1, 0, 1,15, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 6, 0,12, 0, 6, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'demon_knight',x:5,y:5},{defId:'dragon',x:3,y:3},{defId:'dragon',x:7,y:3}]
  },
  { // Floor 35
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 1, 1, 0, 4, 0, 1],
      [ 1, 0, 0, 0, 1,12, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0,15, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'demon_knight',x:3,y:3},{defId:'fire_demon',x:7,y:7}]
  },
  { // Floor 36
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 4, 1, 4, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1,15, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0,12, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'demon_knight',x:3,y:3},{defId:'demon_knight',x:7,y:3}]
  },
  { // Floor 37
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0,10, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1,15, 1, 0, 4, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0,13, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'lich',x:3,y:7},{defId:'dragon',x:7,y:3}]
  },
  { // Floor 38
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 4, 0,12, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 3, 0, 1,15, 1, 0, 3, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 6, 0, 0, 0, 6, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'demon_knight',x:5,y:5},{defId:'dragon',x:3,y:3},{defId:'dragon',x:7,y:3}]
  },
  { // Floor 39
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 4, 1, 0, 3, 0, 1],
      [ 1, 0, 0, 0, 1,15, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0,12, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:3},{defId:'demon_knight',x:7,y:5},{defId:'lich',x:3,y:7}]
  },
  { // Floor 40
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,13, 0, 0, 0,13, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,12, 0, 0, 0,12, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,13, 0, 0, 0,13, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'demon_knight',x:5,y:5}]
  },
  { // Floor 41
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 4, 1, 0, 4, 0, 1],
      [ 1, 0, 0, 0, 1,15, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 0,12, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:3},{defId:'demon_knight',x:3,y:5},{defId:'demon_knight',x:7,y:5}]
  },
  { // Floor 42
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 4, 1, 4, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0,12, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1,15, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'demon_knight',x:3,y:3},{defId:'dragon',x:7,y:7}]
  },
  { // Floor 43
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 4, 1, 0, 4, 0, 1],
      [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1,15, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0,13, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:3},{defId:'demon_knight',x:3,y:7},{defId:'demon_knight',x:7,y:7}]
  },
  { // Floor 44
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1,13, 0, 4, 0,13, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1,15, 1, 0, 4, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'demon_knight',x:3,y:3},{defId:'demon_knight',x:7,y:3}]
  },
  { // Floor 45
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 4, 1, 0, 4, 0, 1],
      [ 1, 0, 0, 0, 1,15, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1,13, 0,12, 0,13, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 3, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:3},{defId:'dragon',x:3,y:5},{defId:'demon_knight',x:7,y:5}]
  },
  { // Floor 46
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 4, 1, 4, 1, 1, 0, 1],
      [ 1, 0, 1,12, 0, 0, 0,12, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 4, 1, 0, 1, 0, 1],
      [ 1, 0, 0, 0, 1,15, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0,13, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'dragon',x:3,y:3},{defId:'demon_knight',x:7,y:7}]
  },
  { // Floor 47
    playerStart:{x:1,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 0,10, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1,15, 1, 0, 4, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0,13, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 4, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'demon_knight',x:3,y:7},{defId:'dragon',x:7,y:3}]
  },
  { // Floor 48
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0,10, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [ 1, 0, 1,13, 0, 4, 0,13, 1, 0, 1],
      [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1,15, 1, 0, 4, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1, 7, 0,12, 0, 7, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 4, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:5},{defId:'dragon',x:3,y:3},{defId:'demon_knight',x:7,y:3}]
  },
  { // Floor 49
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 1, 1, 1,10, 1, 1, 1, 0, 1],
      [ 1, 0, 1, 7, 0, 0, 0, 0, 1, 0, 1],
      [ 1, 0, 4, 0, 1, 4, 1, 0, 4, 0, 1],
      [ 1, 0, 0, 0, 1,15, 1, 0, 0, 0, 1],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [ 1, 0, 1,13, 0,12, 0,13, 1, 0, 1],
      [ 1, 0, 1, 1, 1, 4, 1, 1, 1, 0, 1],
      [ 1, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon',x:5,y:3},{defId:'demon_knight',x:3,y:5},{defId:'demon_knight',x:7,y:5},{defId:'dragon',x:5,y:7}]
  },
  { // Floor 50
    playerStart:{x:5,y:9},
    tiles:[
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,13, 0, 0, 0,13, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0,13, 0, 0, 0,13, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    monsters:[{defId:'dragon_god',x:5,y:5}]
  }
];


// DATA_COMPLETE
