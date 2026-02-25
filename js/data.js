/**
 * data.js - 静态游戏数据
 * 包含地图定义、卡牌数据、怪物数据
 */

// 瓷砖类型常量
export const TILE = {
  FLOOR: 0,
  WALL: 1,
  DOOR_YELLOW: 2,
  DOOR_BLUE: 3,
  DOOR_RED: 4,
  KEY_YELLOW: 5,
  KEY_BLUE: 6,
  KEY_RED: 7,
  STAIRS: 10,
  HEALTH_POTION: 12,
  SPIKE_TRAP: 15,
};

// 第一层地图数据 (11x11)
// 行索引=y，列索引=x
export const FLOOR1_TILES = [
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,0,1,0,12,0,1],
  [1,0,1,0,1,0,2,0,0,0,1],
  [1,5,1,0,0,0,1,1,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,1,0,1],
  [1,0,0,0,1,0,3,0,6,0,1],
  [1,0,15,0,0,0,0,0,0,10,1],
  [1,1,1,1,1,1,1,1,1,1,1],
];

// 玩家起始位置 [x, y]
export const PLAYER_START = { x: 1, y: 1 };

// 初始怪物列表
export const INITIAL_MONSTERS = [
  {
    id: 'slime_green',
    name: '绿史莱姆',
    emoji: '🟢',
    x: 5,
    y: 5,
    hp: 25,
    maxHp: 25,
    atk: 8,
    // 行动模式：循环执行
    actionPattern: [
      { type: 'attack', value: 8,  label: '攻击 8伤害' },
      { type: 'attack', value: 8,  label: '攻击 8伤害' },
      { type: 'power',  value: 12, label: '强化攻击 12伤害', chargeMsg: '正在积蓄力量！' },
    ],
    actionIndex: 0,
  },
];

// 初始牌组（10张）
export const STARTER_DECK = [
  { id: 'strike', name: '打击', cost: 1, type: 'attack', value: 6,  desc: '造成6点伤害' },
  { id: 'strike', name: '打击', cost: 1, type: 'attack', value: 6,  desc: '造成6点伤害' },
  { id: 'strike', name: '打击', cost: 1, type: 'attack', value: 6,  desc: '造成6点伤害' },
  { id: 'defend', name: '防御', cost: 1, type: 'skill',  value: 5,  desc: '获得5点护盾' },
  { id: 'defend', name: '防御', cost: 1, type: 'skill',  value: 5,  desc: '获得5点护盾' },
  { id: 'defend', name: '防御', cost: 1, type: 'skill',  value: 5,  desc: '获得5点护盾' },
  { id: 'quick',  name: '速击', cost: 1, type: 'attack', value: 4,  hits: 2, desc: '造成4伤害×2次' },
  { id: 'heavy',  name: '重击', cost: 2, type: 'attack', value: 12, desc: '造成12点伤害' },
  { id: 'parry',  name: '招架', cost: 2, type: 'skill',  value: 8,  desc: '获得8点护盾' },
  { id: 'heal',   name: '包扎', cost: 2, type: 'skill',  value: 8,  isHeal: true, desc: '恢复8点生命' },
];

// 战斗胜利后可获得的奖励卡池
export const REWARD_CARD_POOL = [
  { id: 'heavy',  name: '重击', cost: 2, type: 'attack', value: 12, desc: '造成12点伤害' },
  { id: 'parry',  name: '招架', cost: 2, type: 'skill',  value: 8,  desc: '获得8点护盾' },
  { id: 'heal',   name: '包扎', cost: 2, type: 'skill',  value: 8,  isHeal: true, desc: '恢复8点生命' },
  { id: 'quick',  name: '速击', cost: 1, type: 'attack', value: 4,  hits: 2, desc: '造成4伤害×2次' },
];

// 玩家初始属性
export const PLAYER_INIT = {
  hp: 50,
  maxHp: 80,
  shield: 0,
  energy: 3,
  maxEnergy: 3,
  handSize: 5,
};
