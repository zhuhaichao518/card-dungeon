/**
 * save.js - 存档 / 读档系统
 * 使用 localStorage 存储最多 3 个存档槽位
 */

const SAVE_KEY_PREFIX = 'card_dungeon_save_';
const SLOT_COUNT = 3;

/**
 * 获取存档键名
 */
function slotKey(slot) {
  return `${SAVE_KEY_PREFIX}slot_${slot}`;
}

/**
 * 保存当前游戏状态到指定槽位
 * @param {object} state - 游戏状态对象
 * @param {number} slot  - 0, 1, 2
 */
export function saveGame(state, slot) {
  const data = {
    version: 1,
    savedAt: new Date().toLocaleString('zh-CN'),
    floor:   state.floor,
    player: {
      x: state.player.x,
      y: state.player.y,
      hp: state.player.hp,
      maxHp: state.player.maxHp,
    },
    inventory: { ...state.inventory },
    // 只保存修改过的瓷砖（减少存储量）
    tiles: state.tiles.map(row => [...row]),
    // 剩余怪物列表
    monsters: state.monsters.map(m => ({
      id:          m.id,
      name:        m.name,
      emoji:       m.emoji,
      x:           m.x,
      y:           m.y,
      hp:          m.hp,
      maxHp:       m.maxHp,
      atk:         m.atk,
      actionPattern: m.actionPattern,
      actionIndex:   m.actionIndex,
    })),
    // 完整牌组（含获得的新卡）
    allCards: state.deck.allCards.map(c => ({ ...c })),
  };

  try {
    localStorage.setItem(slotKey(slot), JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('存档失败:', e);
    return false;
  }
}

/**
 * 读取指定槽位的存档信息
 * @param {number} slot
 * @returns {object|null}
 */
export function loadSave(slot) {
  try {
    const raw = localStorage.getItem(slotKey(slot));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/**
 * 删除指定槽位的存档
 * @param {number} slot
 */
export function deleteSave(slot) {
  localStorage.removeItem(slotKey(slot));
}

/**
 * 获取所有槽位的存档摘要（用于存档列表显示）
 * @returns {Array<object|null>} 长度为 SLOT_COUNT 的数组
 */
export function getAllSaves() {
  return Array.from({ length: SLOT_COUNT }, (_, i) => loadSave(i));
}

/**
 * 将存档数据恢复到 state 对象
 * @param {object} state  - 当前游戏状态（会被修改）
 * @param {object} data   - 来自 loadSave() 的数据
 */
export function restoreState(state, data) {
  state.phase   = 'explore';
  state.floor   = data.floor;

  state.player.x      = data.player.x;
  state.player.y      = data.player.y;
  state.player.hp     = data.player.hp;
  state.player.maxHp  = data.player.maxHp;
  state.player.shield = 0;
  state.player.energy = state.player.maxEnergy;

  state.inventory = { ...data.inventory };
  state.tiles     = data.tiles.map(row => [...row]);
  state.monsters  = data.monsters.map(m => ({ ...m }));

  // 重建牌组
  const { deck } = state;
  deck.allCards    = data.allCards.map(c => ({ ...c }));
  deck.drawPile    = shuffle([...deck.allCards]);
  deck.hand        = [];
  deck.discardPile = [];

  state.messages = ['存档已读取，继续冒险！'];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
