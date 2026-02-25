/**
 * renderer.js - 地图渲染器
 * 将游戏状态渲染为DOM元素
 */

import { state } from './state.js';
import { TILE } from './data.js';

// 瓷砖显示配置
const TILE_CONFIG = {
  [TILE.FLOOR]:         { cls: 'tile-floor',   symbol: '',   title: '地板' },
  [TILE.WALL]:          { cls: 'tile-wall',    symbol: '',   title: '墙壁' },
  [TILE.DOOR_YELLOW]:   { cls: 'tile-door-yellow', symbol: '门', title: '黄门（需要黄钥匙）' },
  [TILE.DOOR_BLUE]:     { cls: 'tile-door-blue',   symbol: '门', title: '蓝门（需要蓝钥匙）' },
  [TILE.DOOR_RED]:      { cls: 'tile-door-red',    symbol: '门', title: '红门（需要红钥匙）' },
  [TILE.KEY_YELLOW]:    { cls: 'tile-key-yellow',  symbol: '⚷',  title: '黄钥匙' },
  [TILE.KEY_BLUE]:      { cls: 'tile-key-blue',    symbol: '⚷',  title: '蓝钥匙' },
  [TILE.KEY_RED]:       { cls: 'tile-key-red',     symbol: '⚷',  title: '红钥匙' },
  [TILE.STAIRS]:        { cls: 'tile-stairs',  symbol: '▲',  title: '楼梯' },
  [TILE.HEALTH_POTION]: { cls: 'tile-potion',  symbol: '+',  title: '血瓶 (+30 HP)' },
  [TILE.SPIKE_TRAP]:    { cls: 'tile-trap',    symbol: '⚠',  title: '刺陷阱 (-10 HP)' },
};

/**
 * 渲染整张地图到 #map-grid
 */
export function renderMap() {
  const grid = document.getElementById('map-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const { tiles, player, monsters } = state;
  const rows = tiles.length;
  const cols = tiles[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement('div');
      cell.classList.add('tile');
      cell.dataset.x = x;
      cell.dataset.y = y;

      // 检查是否有怪物在这个格子
      const monster = monsters.find(m => m.x === x && m.y === y);
      // 检查是否是玩家
      const isPlayer = (player.x === x && player.y === y);

      if (isPlayer) {
        cell.classList.add('tile-player');
        cell.textContent = '@';
        cell.title = '玩家';
      } else if (monster) {
        cell.classList.add('tile-monster-green');
        cell.textContent = monster.emoji || 'S';
        cell.title = monster.name;
        cell.dataset.monsterId = monster.id;
      } else {
        const tileType = tiles[y][x];
        const config = TILE_CONFIG[tileType] || TILE_CONFIG[TILE.FLOOR];
        cell.classList.add(config.cls);
        cell.textContent = config.symbol;
        cell.title = config.title;
      }

      grid.appendChild(cell);
    }
  }
}
