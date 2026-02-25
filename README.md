# ⚔️ Card Dungeon - 卡牌地牢

魔塔风格地图探索 + 卡牌战斗的网页游戏。

## 快速开始

直接在浏览器中打开 `index.html` 即可开始游戏。

```bash
# 或者用本地服务器
cd /tmp/card-dungeon
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 技术栈

- 纯 HTML5 + CSS3 + 原生 JavaScript (ES6 模块)
- 无外部依赖

## 操作方式

- **WASD / 方向键** - 移动
- **鼠标点击相邻格子** - 移动
- **战斗中点击卡牌** - 出牌
- **结束回合按钮** - 结束当前回合

## 文件结构

```
├── index.html      # 首页
├── game.html       # 游戏主页
├── css/style.css   # 样式
├── js/
│   ├── data.js     # 静态数据
│   ├── state.js    # 游戏状态
│   ├── renderer.js # 地图渲染
│   ├── explore.js  # 探索逻辑
│   ├── battle.js   # 战斗系统
│   ├── ui.js       # UI更新
│   └── main.js     # 入口
├── GDD.md          # 设计文档
└── README.md       # 本文件
```
