/**
 * save.js - 存档 / 读档（支持多楼层 + 状态效果）
 */
import { MONSTER_DEFS } from './data.js';

const KEY = (slot) => `card_dungeon_save_slot_${slot}`;

export function saveGame(state, slot) {
  try {
    const data = {
      v: 2,
      savedAt: new Date().toLocaleString('zh-CN'),
      floor:   state.floor,
      player: {
        x: state.player.x, y: state.player.y,
        hp: state.player.hp, maxHp: state.player.maxHp,
        maxAp: state.player.maxAp,
      },
      inventory: { ...state.inventory },
      tiles:    state.tiles.map(r => [...r]),
      monsters: state.monsters.map(m => ({ defId: m.id, x: m.x, y: m.y, hp: m.hp })),
      allCards: state.deck.allCards.map(c => ({ ...c })),
    };
    localStorage.setItem(KEY(slot), JSON.stringify(data));
    return true;
  } catch(e) { console.error(e); return false; }
}

export function loadSave(slot) {
  try {
    const raw = localStorage.getItem(KEY(slot));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function deleteSave(slot) { localStorage.removeItem(KEY(slot)); }

export function getAllSaves() { return [0,1,2].map(loadSave); }

export function restoreState(state, data) {
  state.phase  = 'explore';
  state.floor  = data.floor;

  Object.assign(state.player, {
    x: data.player.x, y: data.player.y,
    hp: data.player.hp, maxHp: data.player.maxHp,
    maxAp: data.player.maxAp || 3,
    shield: 0,
    effects: { poison:0, burn:0, weakness:0, strength:0 },
  });

  state.inventory = { ...data.inventory };
  state.tiles     = data.tiles.map(r => [...r]);

  state.monsters = data.monsters.map(m => {
    const def = JSON.parse(JSON.stringify(MONSTER_DEFS[m.defId] || {}));
    return { ...def, x:m.x, y:m.y, hp:m.hp, maxHp:def.maxHp||m.hp,
             shield:0, effects:{poison:0,burn:0,weakness:0,strength:0} };
  }).filter(Boolean);

  state.deck.allCards    = data.allCards.map(c => ({ ...c }));
  state.deck.drawPile    = shuffle([...state.deck.allCards]);
  state.deck.hand        = [];
  state.deck.discardPile = [];

  state.messages = [`存档读取：第 ${data.floor} 层，继续冒险！`];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
