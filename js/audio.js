/**
 * audio.js - BGM / 音效管理
 *
 * BGM 分区（每10层一首）：
 *   floors  1-10  → bgm1.mp3  （探索·序章）
 *   floors 11-20  → bgm2.mp3  （地牢·深处）
 *   floors 21-30  → bgm3.mp3  （暗影·迷宫）
 *   floors 31-40  → bgm4.mp3  （天空·神殿）
 *   floors 41-50  → bgm5.mp3  （终焉·魔王）
 *   战斗中         → battle.mp3
 *
 * 把对应 mp3 放到 /assets/bgm/ 目录下即可自动生效。
 */

const BGM_DIR = 'assets/bgm/';

const BGM_MAP = {
  explore_1:  'bgm1.mp3',   // 1-10 层
  explore_2:  'bgm2.mp3',   // 11-20 层
  explore_3:  'bgm3.mp3',   // 21-30 层
  explore_4:  'bgm4.mp3',   // 31-40 层
  explore_5:  'bgm5.mp3',   // 41-50 层
  battle:     'battle.mp3', // 战斗
};

let _audio    = null;  // 当前播放的 Audio 实例
let _current  = null;  // 当前 BGM key
let _enabled  = true;
let _volume   = 0.5;

/** 根据楼层数（1-50）得到 BGM key */
export function bgmKeyForFloor(floor) {
  if (floor <= 10)  return 'explore_1';
  if (floor <= 20)  return 'explore_2';
  if (floor <= 30)  return 'explore_3';
  if (floor <= 40)  return 'explore_4';
  return 'explore_5';
}

/** 播放指定 BGM（key 为 BGM_MAP 中的键）；已在播放同一首则跳过 */
export function playBgm(key) {
  if (!_enabled) return;
  if (key === _current && _audio && !_audio.paused) return;

  const file = BGM_MAP[key];
  if (!file) return;

  _stopCurrent();
  _current = key;

  const audio = new Audio(BGM_DIR + file);
  audio.loop   = true;
  audio.volume = _volume;
  audio.play().catch(() => {/* 浏览器自动播放策略阻止时静默 */});
  _audio = audio;
}

/** 切换到与当前楼层匹配的探索 BGM */
export function playFloorBgm(floor) {
  playBgm(bgmKeyForFloor(floor));
}

/** 切换到战斗 BGM（保存探索 BGM 状态，结束后 playFloorBgm 恢复） */
export function playBattleBgm() {
  playBgm('battle');
}

/** 停止所有 BGM */
export function stopBgm() {
  _stopCurrent();
  _current = null;
}

/** 设置音量 0.0-1.0 */
export function setBgmVolume(v) {
  _volume = Math.max(0, Math.min(1, v));
  if (_audio) _audio.volume = _volume;
}

/** 开/关 BGM */
export function toggleBgm(on) {
  _enabled = on ?? !_enabled;
  if (!_enabled) _stopCurrent();
  return _enabled;
}

export function isBgmEnabled() { return _enabled; }

// ── 内部 ──────────────────────────────────────────────────────────────────────
function _stopCurrent() {
  if (_audio) {
    _audio.pause();
    _audio.currentTime = 0;
    _audio = null;
  }
}
