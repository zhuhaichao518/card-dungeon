/**
 * story.js - 剧情/对话/过场系统
 *
 * 故事序列格式：
 * { type:'text',    speaker:'???',    text:'...', portrait:'🔴' }
 * { type:'battle',  defId:'general_red', scripted:true }  // 剧情战斗（必败）
 * { type:'goto',    floor:4, x:2, y:8 }                   // 传送
 * { type:'heal',    hp:30 }
 * { type:'setHp',   hp:5 }
 */

import { state, loadFloor, healPlayer } from './state.js';
import { renderMap } from './renderer.js';
import { updateExploreUI } from './ui.js';
import { startBattle } from './battle.js';
import { MONSTER_DEFS } from './data.js';

// ── 内部状态 ──────────────────────────────────────────────────────────────────
let _queue    = [];
let _onDone   = null;
let _typing   = null;

// ── 公开 API ──────────────────────────────────────────────────────────────────

/**
 * 运行一个故事序列
 * @param {Array}    steps      步骤列表
 * @param {Function} onComplete 全部完成后的回调
 */
export function runStorySequence(steps, onComplete) {
  _queue  = [...steps];
  _onDone = onComplete || (() => {});
  showStoryOverlay();
  _nextStep();
}

/** 当前是否在剧情模式 */
export function isInStory() {
  return !document.getElementById('story-overlay')?.classList.contains('hidden');
}

// ── 内部函数 ──────────────────────────────────────────────────────────────────

function _nextStep() {
  if (_queue.length === 0) {
    hideStoryOverlay();
    if (_onDone) _onDone();
    return;
  }
  const step = _queue.shift();

  switch (step.type) {

    case 'text': {
      // 显示对话文字
      const portrait = document.getElementById('story-portrait');
      const speaker  = document.getElementById('story-speaker');
      const textEl   = document.getElementById('story-text');
      const btn      = document.getElementById('story-next-btn');

      portrait.textContent = step.portrait || '📜';
      speaker.textContent  = step.speaker  || '';
      textEl.textContent   = '';

      // 打字机效果
      if (_typing) clearInterval(_typing);
      let i = 0;
      const msg = step.text;
      _typing = setInterval(() => {
        textEl.textContent += msg[i++];
        if (i >= msg.length) { clearInterval(_typing); _typing = null; }
      }, 30);

      btn.onclick = () => {
        // 点击立即完成打字，再次点击进下一步
        if (_typing) {
          clearInterval(_typing);
          _typing = null;
          textEl.textContent = msg;
        } else {
          _nextStep();
        }
      };
      break;
    }

    case 'battle': {
      // 剧情战斗（必败）：玩家 HP 归零时续接故事而非 game over
      hideStoryOverlay();
      const def = MONSTER_DEFS[step.defId];
      if (!def) { _nextStep(); return; }
      const monster = {
        ...JSON.parse(JSON.stringify(def)),
        defId:  def.id,
        x: 0, y: 0,
        shield: 0,
        effects: { poison:0, burn:0, weakness:0, strength:0 },
      };
      // 注册回调：玩家死亡时不是 game over，而是续接剧情
      state._scriptedBattle = true;
      state._scriptedBattleCallback = () => {
        // 隐藏战斗界面，继续故事序列
        showStoryOverlay();
        _nextStep();
      };
      startBattle(monster);
      // 不立即调用 _nextStep，由 _scriptedBattleCallback 触发
      break;
    }

    case 'goto': {
      // 传送到指定楼层/位置
      loadFloor(step.floor - 1);   // loadFloor 内部是0-indexed
      if (step.x !== undefined) {
        state.player.x = step.x;
        state.player.y = step.y;
      }
      renderMap();
      updateExploreUI();
      _nextStep();
      break;
    }

    case 'heal': {
      healPlayer(step.hp);
      updateExploreUI();
      _nextStep();
      break;
    }

    case 'setHp': {
      state.player.hp = Math.max(1, step.hp);
      updateExploreUI();
      _nextStep();
      break;
    }

    case 'setStats': {
      // 重置英雄属性（如被夺走装备）
      if (step.hp    !== undefined) state.player.hp    = Math.max(1, step.hp);
      if (step.maxHp !== undefined) state.player.maxHp = step.maxHp;
      if (step.atk   !== undefined) state.player.atk   = step.atk;
      if (step.def   !== undefined) state.player.def   = step.def;
      updateExploreUI();
      _nextStep();
      break;
    }

    case 'wait': {
      setTimeout(_nextStep, step.ms || 500);
      break;
    }

    default:
      _nextStep();
  }
}

// ── 战斗结果面板 ─────────────────────────────────────────────────────────────

function showBattleResultPanel(msg, cb) {
  const el = document.getElementById('story-result-panel');
  const txt = document.getElementById('story-result-text');
  const btn = document.getElementById('story-result-btn');
  if (!el) { cb(); return; }
  txt.textContent = msg;
  el.classList.remove('hidden');
  btn.onclick = () => { el.classList.add('hidden'); cb(); };
}

// ── 显示/隐藏 ────────────────────────────────────────────────────────────────

function showStoryOverlay() {
  document.getElementById('story-overlay')?.classList.remove('hidden');
}

function hideStoryOverlay() {
  document.getElementById('story-overlay')?.classList.add('hidden');
}

// ── 预定义故事序列 ────────────────────────────────────────────────────────────

/** 第3层伏击事件 */
export const AMBUSH_STORY = [
  { type:'text', portrait:'📜', speaker:'', text:'你小心翼翼地踏上第三层。身着神圣铠甲，手握神圣之剑，背负神圣盾牌——没有人可以挡住你的去路。' },
  { type:'text', portrait:'🔴', speaker:'赤甲将军', text:'哈哈哈！就是你了，胆敢进入魔王之塔的傻瓜。我们等候多时了！' },
  { type:'text', portrait:'🔵', speaker:'蓝衣将军', text:'魔王有令，活捉此人，带回塔底地牢。当然……不必保持太完整。' },
  { type:'text', portrait:'🟡', speaker:'金甲将军', text:'四对一——就算你再强，也逃不过天罗地网！动手！' },
  { type:'text', portrait:'📜', speaker:'', text:'四名将军同时出手，毫无章法可言，以多欺少。你根本来不及应对……' },
  { type:'battle', defId:'general_red', scripted:true },
  { type:'text', portrait:'📜', speaker:'', text:'……你被击倒了。' },
  { type:'text', portrait:'🔴', speaker:'赤甲将军', text:'搜他身上所有东西！神圣剑、神圣盾……都归魔王所有。' },
  { type:'text', portrait:'🔵', speaker:'蓝衣将军', text:'这小子，赤手空拳关进地牢里，让他慢慢受苦。' },
  { type:'text', portrait:'📜', speaker:'', text:'当你再次睁开眼睛时，周围是冰冷的石壁，还有远处渐渐消失的脚步声……' },
  { type:'text', portrait:'📜', speaker:'', text:'你身处地牢第一层。神圣剑、神圣盾都不见了。只有求生的意志，让你缓缓站起来。' },
  { type:'setStats', hp:30, maxHp:500, atk:10, def:10 },
  { type:'goto', floor:4, x:2, y:8 },
];

/** 逃出监狱后的文本（在 explore.js 里某个特定坐标触发）*/
export const PRISON_ESCAPE_STORY = [
  { type:'text', portrait:'📜', speaker:'', text:'你击倒了昏昏欲睡的守卫，摸到了他腰间的钥匙。' },
  { type:'text', portrait:'🧙', speaker:'英雄', text:'……终于出来了。魔王的四名将军，我一定要找你们算账！' },
  { type:'text', portrait:'📜', speaker:'', text:'你的伤势在战斗中逐渐恢复。现在，是时候真正攀登这座塔了。' },
  { type:'heal', hp:30 },
];
