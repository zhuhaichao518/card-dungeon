/**
 * state.js - 全局游戏状态
 * 英雄和怪物均使用行动值+牌组系统
 */

import {
  FLOOR1_TILES, PLAYER_START, INITIAL_MONSTERS,
  STARTER_DECK, PLAYER_INIT, MONSTER_DEFS,
} from './data.js';

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

// ─── 构建怪物实例（从 MONSTER_DEFS 展开）─────────────────────────────────
function buildMonster(entry) {
  const def = deepClone(MONSTER_DEFS[entry.defId]);
  return {
    ...def,
    x:      entry.x,
    y:      entry.y,
    hp:     def.hp,
    maxHp:  def.maxHp,
    shield: 0,
  };
}

// ─── 初始状态工厂 ──────────────────────────────────────────────────────────
function createInitialState() {
  return {
    phase: 'explore',   // 'explore' | 'battle' | 'gameover'
    floor: 1,

    player: {
      x:      PLAYER_START.x,
      y:      PLAYER_START.y,
      hp:     PLAYER_INIT.hp,
      maxHp:  PLAYER_INIT.maxHp,
      shield: 0,
      maxAp:  PLAYER_INIT.maxAp,
      handSize: PLAYER_INIT.handSize,
    },

    inventory: { keyYellow: 0, keyBlue: 0, keyRed: 0 },

    tiles:    deepClone(FLOOR1_TILES),
    monsters: INITIAL_MONSTERS.map(buildMonster),

    // ── 英雄牌组 ──
    deck: {
      allCards:    deepClone(STARTER_DECK),
      drawPile:    [],
      hand:        [],
      discardPile: [],
    },

    // ── 战斗状态（仅在 phase==='battle' 有意义）──
    battle: {
      monster:  null,    // 当前怪物引用
      turn:     0,       // 回合数（每次 startNewTurn 时 +1）

      // 英雄行动值
      hero: {
        ap:        0,    // 本回合剩余行动值
        turnApMax: 0,    // 本回合初始行动值 = min(turn, player.maxAp)
      },

      // 怪物行动值 + 牌组
      enemy: {
        ap:        0,
        turnApMax: 0,
        hand:        [],
        drawPile:    [],
        discardPile: [],
        intent:      [],  // 本回合预告将打出的牌（有序列表）
      },

      log: [],
    },

    messages: ['欢迎来到卡牌地牢！用 WASD 或方向键移动。'],
  };
}

export const state = createInitialState();

export function resetState() {
  Object.assign(state, createInitialState());
}

// ─── 通用工具 ──────────────────────────────────────────────────────────────

export function addMessage(msg) {
  state.messages.push(msg);
  if (state.messages.length > 5) state.messages.shift();
}

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

export function damageMonster(monster, dmg) {
  const shield  = monster.shield || 0;
  const absorbed = Math.min(shield, dmg);
  monster.shield = shield - absorbed;
  monster.hp = Math.max(0, monster.hp - (dmg - absorbed));
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── 英雄摸牌 ─────────────────────────────────────────────────────────────

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
