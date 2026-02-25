/**
 * state.js - 全局游戏状态
 * 单一数据源，所有模块通过此对象读写状态
 */

import { FLOOR1_TILES, PLAYER_START, INITIAL_MONSTERS, STARTER_DECK, PLAYER_INIT } from './data.js';

// 深拷贝工具
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 初始化游戏状态
function createInitialState() {
  return {
    // 游戏阶段: 'explore' | 'battle' | 'gameover' | 'victory'
    phase: 'explore',

    // 当前楼层
    floor: 1,

    // 玩家状态
    player: {
      x: PLAYER_START.x,
      y: PLAYER_START.y,
      hp: PLAYER_INIT.hp,
      maxHp: PLAYER_INIT.maxHp,
      shield: 0,
      energy: PLAYER_INIT.maxEnergy,
      maxEnergy: PLAYER_INIT.maxEnergy,
    },

    // 物品栏（钥匙）
    inventory: {
      keyYellow: 0,
      keyBlue: 0,
      keyRed: 0,
    },

    // 地图瓷砖（可变，拾取后格子变为地板）
    tiles: deepClone(FLOOR1_TILES),

    // 怪物列表（可变，击败后移除）
    monsters: deepClone(INITIAL_MONSTERS),

    // 牌组系统
    deck: {
      drawPile: deepClone(STARTER_DECK),  // 待抽牌堆
      hand: [],                            // 手牌
      discardPile: [],                     // 弃牌堆
      allCards: deepClone(STARTER_DECK),  // 全部卡牌（含已获得新卡）
    },

    // 当前战斗状态（战斗时使用）
    battle: {
      monster: null,        // 当前战斗的怪物引用
      turn: 1,              // 战斗回合数
      monsterIntent: null,  // 怪物当前意图 { label, value, type }
      log: [],              // 战斗日志
    },

    // 探索消息日志（最近5条）
    messages: ['欢迎来到卡牌地牢！用WASD或方向键移动。'],
  };
}

// 导出可变状态对象
export const state = createInitialState();

/**
 * 重置游戏状态（新游戏）
 */
export function resetState() {
  const fresh = createInitialState();
  Object.assign(state, fresh);
}

/**
 * 添加探索消息（保留最近5条）
 * @param {string} msg
 */
export function addMessage(msg) {
  state.messages.push(msg);
  if (state.messages.length > 5) {
    state.messages.shift();
  }
}

/**
 * 对玩家造成伤害（扣除护盾后再扣血）
 * @param {number} dmg
 * @returns {number} 实际造成的伤害
 */
export function damagePlayer(dmg) {
  const absorbed = Math.min(state.player.shield, dmg);
  state.player.shield -= absorbed;
  const realDmg = dmg - absorbed;
  state.player.hp = Math.max(0, state.player.hp - realDmg);
  return realDmg;
}

/**
 * 治疗玩家
 * @param {number} amount
 */
export function healPlayer(amount) {
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + amount);
}

/**
 * 对怪物造成伤害
 * @param {object} monster
 * @param {number} dmg
 */
export function damageMonster(monster, dmg) {
  monster.hp = Math.max(0, monster.hp - dmg);
}

/**
 * 洗牌（Fisher-Yates）
 * @param {Array} arr
 * @returns {Array} 打乱后的新数组
 */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 从牌堆抽牌到手牌
 * @param {number} count
 */
export function drawCards(count) {
  const { deck } = state;
  for (let i = 0; i < count; i++) {
    // 如果待抽堆空了，把弃牌堆洗回去
    if (deck.drawPile.length === 0) {
      if (deck.discardPile.length === 0) break;
      deck.drawPile = shuffle(deck.discardPile);
      deck.discardPile = [];
    }
    deck.hand.push(deck.drawPile.pop());
  }
}

/**
 * 弃掉手牌
 */
export function discardHand() {
  const { deck } = state;
  deck.discardPile.push(...deck.hand);
  deck.hand = [];
}
