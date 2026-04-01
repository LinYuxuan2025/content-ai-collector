# 知识收藏夹 (Knowledge Collector)

## 1. Concept & Vision

一个优雅的个人知识收藏工具，帮助用户将散落在网络各处的碎片灵感（小红书、微博、知乎等）集中管理。核心体验是"一键粘贴，AI 自动整理"——复制网页内容后粘贴，AI 会自动识别类型、提取关键信息、生成分类标签，让回顾和学习变得系统高效。设计风格追求「安静书店」的氛围：温暖、沉稳、有书卷气，让用户在浏览自己的收藏时感到平静和满足。

## 2. Design Language

### Aesthetic Direction
「日式极简 + 文具感」—— 温暖的米白底色、木质/纸质感元素、精致但不喧宾夺主的动效。参考：MUJi 门店的陈列感、Goodnotes 的文具美学。

### Color Palette
```
--bg-primary: #FDFBF7        /* 暖白纸张色 */
--bg-secondary: #F5F1EA      /* 淡米色卡片背景 */
--bg-tertiary: #EDE8DD       /* 稍深一层的分区背景 */
--text-primary: #2C2C2C      /* 深灰正文 */
--text-secondary: #6B6B6B    /* 次要文字 */
--text-muted: #999999        /* 占位符、辅助文字 */
--accent-primary: #C4A77D     /* 暖金色 - 主要强调色 */
--accent-secondary: #8B9A7D   /* 橄榄绿 - 标签/分类 */
--accent-tertiary: #B8860B   /* 暗金色 - hover状态 */
--border: #E5E0D5            /* 柔和边框 */
--shadow: rgba(44, 44, 44, 0.08)
```

### Typography
- **标题**: `"Noto Serif SC", "Source Han Serif CN", Georgia, serif`
- **正文**: `"Noto Sans SC", "Source Han Sans CN", -apple-system, sans-serif`
- **英文/数字**: `"Crimson Pro", Georgia, serif`
- **代码块**: `"JetBrains Mono", "Fira Code", monospace`

### Motion Philosophy
- **入场动画**: opacity 0→1, translateY 12px→0, 300ms ease-out, items staggered 50ms
- **悬停反馈**: scale 1.01, shadow 加深, 200ms ease
- **内容展开**: max-height 动画, 250ms ease-in-out

## 3. Layout & Structure

### 页面结构
```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + 搜索框 + 设置按钮                        │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌─────────────────────────────────────┐ │
│  │ Sidebar  │  │  Main Content Area                   │ │
│  │ - 全部   │  │  [内容卡片列表 / 空状态]              │ │
│  │ - 分类   │  │  卡片: 标题 + 摘要 + 分类标签        │ │
│  └──────────┘  │  + 来源 + 时间 + 操作按钮           │ │
│                └─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 4. Features & Interactions

### 核心功能
1. **快速粘贴** - Cmd/Ctrl+V 或点击粘贴按钮，自动读取剪贴板内容
2. **AI 自动整理** - 调用 Claude API 分析内容，生成标题、摘要、分类、标签
3. **分类管理** - 预设分类 + 自定义分类
4. **搜索过滤** - 实时搜索 + 分类筛选 + 标签筛选

### 预设分类
- 人生哲理 💭
- 健身知识 💪
- 面试题库 📋
- 学习方法 📚
- 工作技巧 💼
- 读书笔记 📖
- 待研究 🔍

## 5. Technical Approach

### 技术栈
- **框架**: React 18 + Vite
- **样式**: CSS Modules + CSS Variables
- **状态管理**: React Context + useReducer
- **AI**: Claude API (anthropic)
- **存储**: LocalStorage
- **图标**: Lucide React

### 数据模型
```javascript
// 内容项
{
  id: "uuid",
  title: "string",
  originalContent: "string",
  summary: "string",
  category: "string",
  tags: ["string"],
  highlights: ["string"],
  source: "string",
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp"
}

// 分类
{
  id: "uuid",
  name: "string",
  icon: "emoji",
  order: "number"
}
```
