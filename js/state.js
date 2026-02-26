/**
 * state.js - 全局游戏状态
 * 支持：多楼层 / 状态效果(毒/烧/虚弱/强化) / 英雄+怪物行动值牌组
 */

import {
  FLOORS, PLAYER_INIT, STARTER_DECK, MONSTER_DEFS,
} from './data.js';

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

// ─── 构建怪物实例 ────────────────────────────────────────────────────────────
export function buildMonster(entry) {
  const def = deepClone(MONSTER_DEFS[entry.defId]);
  if (!def) { console.error('Unknown monster:', entry.defId); return null; }
  return {
    ...def,
    defId:   entry.defId,  // 保存defId用于精灵查找
    x:       entry.x,
    y:       entry.y,
    hp:      def.hp,
    maxHp:   def.maxHp,
    shield:  0,
    effects: { poison:0, burn:0, weakness:0, strength:0 },
  };
}

// ─── 空状态效果对象 ───────────────────────────────────────────────────────────
function emptyEffects() {
  return { poison:0, burn:0, weakness:0, strength:0 };
}

// ─── 初始状态工厂 ──────────────────────────────────────────────────────────────
function createInitialState() {
  const floorData = FLOORS[0];
  return {
    phase: 'explore',   // 'explore' | 'battle' | 'gameover' | 'victory'
    floor: 1,

    player: {
      x:        floorData.playerStart.x,
      y:        floorData.playerStart.y,
      hp:       PLAYER_INIT.hp,
      maxHp:    PLAYER_INIT.maxHp,
      shield:   0,
      maxAp:    PLAYER_INIT.maxAp,
      handSize: PLAYER_INIT.handSize,
      effects:  emptyEffects(),
    },

    inventory: { keyYellow:0, keyBlue:0, keyRed:0 },

    tiles:    deepClone(floorData.tiles),
    monsters: floorData.monsters.map(buildMonster).filter(Boolean),

    deck: {
      allCards:    deepClone(STARTER_DECK),
      drawPile:    [],
      hand:        [],
      discardPile: [],
    },

    battle: {
      monster: null,
      turn: 0,
      hero:  { ap: 0, turnApMax: 0 },
      enemy: { ap: 0, turnApMax: 0, hand:[], drawPile:[], discardPile:[], intent:[] },
      log: [],
    },

    messages: ['欢迎来到卡牌地牢！', '用 WASD / 方向键移动。'],

    storyFlags: {},       // 已触发的剧情标记，防止重复触发
    _scriptedBattle: false, // 当前是否为剧情战斗
  };
}

export const state = createInitialState();

export function resetState() {
  const fresh = createInitialState();
  Object.assign(state, fresh);
}

// ─── 加载指定楼层 ────────────────────────────────────────────────────────────
export function loadFloor(floorNum) {
  const floorIdx = floorNum - 1;
  const floorData = FLOORS[floorIdx];
  if (!floorData) {
    // 超过最高层 → 通关
    state.phase = 'victory';
    return;
  }

  state.floor    = floorNum;
  state.tiles    = deepClone(floorData.tiles);
  state.monsters = floorData.monsters.map(buildMonster).filter(Boolean);

  // 玩家移动到入口
  state.player.x = floorData.playerStart.x;
  state.player.y = floorData.playerStart.y;

  // 清空战斗状态
  state.player.shield   = 0;
  state.player.effects  = emptyEffects();

  addMessage(`进入第 ${floorNum} 层！`);
}

// ─── 通用工具 ─────────────────────────────────────────────────────────────────

export function addMessage(msg) {
  state.messages.push(msg);
  if (state.messages.length > 6) state.messages.shift();
}

/** 对玩家造成伤害（先扣护盾）*/
export function damagePlayer(dmg) {
  const absorbed = Math.min(state.player.shield, dmg);
  state.player.shield -= absorbed;
  const real = dmg - absorbed;
  state.player.hp = Math.max(0, state.player.hp - real);
  return real;
}

export function healPlayer(amount) {
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + amount);
}

/** 对怪物造成伤害（先扣护盾，再看虚弱）*/
export function damageMonster(monster, dmg) {
  // 如果玩家有strength效果，此处已在调用前加成，不再二次处理
  const shield   = monster.shield || 0;
  const absorbed = Math.min(shield, dmg);
  monster.shield = shield - absorbed;
  monster.hp     = Math.max(0, monster.hp - (dmg - absorbed));
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function drawCards(count) {
  const { deck } = state;
  for (let i = 0; i < count; i++) {
    if (deck.drawPile.length === 0) {
      if (deck.discardPile.length === 0) break;
      deck.drawPile    = shuffle(deck.discardPile);
      deck.discardPile = [];
    }
    deck.hand.push(deck.drawPile.pop());
  }
}

export function discardHand() {
  state.deck.discardPile.push(...state.deck.hand);
  state.deck.hand = [];
}
