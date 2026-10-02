---
type: operations-manual
tags:
  - sjtu-sti-wiki
  - 网站维护
created: 2026-08-30
updated: 2026-08-30
status: active
source: "SJTU STI Wiki 当前仓库结构与发布流程"
owner: 校团委科创协会
sensitivity: public
---

# SJTU STI Wiki 网站维护手册

## 核心问题

如何在不破坏网站结构、不泄露内部材料的前提下，修改交大科创生存手册的文案、页面、导航和视觉，并完成审核与发布？

## 先判断要改什么

| 修改目标 | 主要文件 | 推荐方式 | 风险 |
| --- | --- | --- | --- |
| 修改普通文章文案 | 对应的 `.md` 文件 | GitHub 网页编辑或本地编辑 | 低 |
| 修改首页文案 | `index.md` | 本地编辑并预览 | 中 |
| 修改导航、侧栏、站点名称 | `.vitepress/config.mts` | 本地编辑并构建 | 中 |
| 修改字体、颜色、间距、响应式排版 | `.vitepress/theme/custom.css` | 本地编辑并检查桌面与手机 | 高 |
| 修改 Logo 或首页背景 | `public/`、配置文件和 CSS | 本地替换并检查资源路径 | 高 |
| 新增文章 | 新建 `.md`，必要时修改侧栏 | 本地编辑并构建 | 中 |
| 修改采访、授权或发布规则 | 项目章程、编辑规范或内部流程 | 先完成内部确认 | 高 |

只改普通文章中的一两句话，可以使用 GitHub 网页编辑。只要涉及首页 HTML、CSS、配置或图片，必须在本地预览后再发布。

## 修改前的边界

### 可以公开提交

- 已经核验并适合公开的 Wiki 文案。
- 公开来源、链接和核验日期。
- 经过批准的页面结构、样式和图片资产。
- 已完成纸质授权、脱敏、核验和老师审核的案例。

### 不得公开提交

- `_private/` 中的任何文件。
- 访谈录音、录像、逐字稿、原始笔记和未脱敏材料。
- 私人联系方式、账号、身份证明或其他敏感信息。
- 尚未取得纸质授权的访谈内容。
- 密码、令牌、私钥、API Key 等秘密。

### 不要手工修改

- `.vitepress/dist/`：构建生成的网页，每次构建都会重建。
- `.vitepress/cache/`：本地缓存。
- `node_modules/`：安装的依赖。
- `package-lock.json`：除非安装或升级依赖，否则不要手工编辑。

上述目录已经被 Git 忽略，不应出现在提交中。

## 文件地图

### 内容文件

| 文件或目录 | 用途 |
| --- | --- |
| `index.md` | 公网首页，包括首屏、六项原则、三条路径和贡献入口 |
| `draft/*.md` | 面向学生的路径指南、资源地图、工具和案例索引 |
| `SJTU STI Survival Manual 大纲.md` | 整本手册的内容框架 |
| `SJTU STI Wiki 项目章程.md` | 项目使命、范围、角色和决策机制 |
| `SJTU STI Wiki 内容模型与编辑规范.md` | 元数据、证据、写作和审核规则 |

### 网站文件

| 文件或目录 | 用途 |
| --- | --- |
| `.vitepress/config.mts` | 站点名称、导航、侧栏、搜索、Logo 和 GitHub 链接 |
| `.vitepress/theme/custom.css` | 首页和正文的全部视觉样式、桌面和手机断点 |
| `.vitepress/theme/index.ts` | 加载 VitePress 默认主题和自定义 CSS |
| `.vitepress/wiki-links.mts` | 将 Obsidian `[[双链]]` 转换为网页链接 |
| `public/` | Logo、首页背景等公开静态资源 |
| `.github/workflows/deploy.yml` | GitHub Pages 自动构建和发布流程 |
| `package.json` | 本地预览和构建命令 |

## 方式一：在 GitHub 上修改普通文案

适合修改错别字、失效链接、简短说明和普通文章段落。

1. 打开 [GitHub 仓库](https://github.com/RRRealCedric/SJTU-STI-Wiki)。
2. 找到需要修改的 `.md` 文件。
3. 点击右上角铅笔图标进入编辑。
4. 修改内容，并检查右侧 Preview。
5. 在提交说明中写清修改目的，例如 `docs: update PRP application link`。
6. 创建新分支和 Pull Request，不直接绕过审核修改 `main`。
7. 由内容编辑检查来源、脱敏和格式，科协老师批准后合并。
8. 合并后等待 GitHub Actions 完成，确认公网页面更新。

不要在 GitHub 网页中大范围修改首页 HTML 或 CSS，因为网页预览不能呈现最终排版。

## 方式二：在本地修改并预览

### 第一次准备

安装 Node.js 18 或更高版本，在仓库目录执行：

```bash
npm install
```

### 开始修改

先同步远程内容：

```bash
git pull --ff-only
```

创建修改分支：

```bash
git switch -c content/update-prp-link
```

启动本地网站：

```bash
npm run docs:dev
```

终端会显示本地地址，通常是：

```text
http://127.0.0.1:5173/SJTU-STI-Wiki/
```

修改文件并保存后，页面通常会自动刷新。

### 发布前构建

```bash
npm run docs:build
```

只有构建成功、没有失效内部链接时，才进入提交和审核。

## 如何修改首页文案

首页位于 `index.md`，分为两部分。

### 首屏文案

文件开头的 `hero` 区域控制主标题、副标题、说明和按钮：

```yaml
hero:
  name: 交大科创生存手册
  text: 自觉 · 自知 · 自洽
  tagline: 知道自己在做什么，为什么这么做，以及是否真正愿意继续。
  actions:
    - theme: brand
      text: 完成六项自查
      link: /#six-principles
```

修改时注意：

- `name` 应始终保留正式名称。
- `text` 是首页核心命题，不要写成宣传口号。
- `tagline` 最好控制在一到两行。
- 站内按钮路径以 `/` 开头，不要手工加入 `/SJTU-STI-Wiki/`。
- 修改按钮锚点时，目标元素的 `id` 必须同步修改。

### 首页正文

`---` 之后是首页 HTML，当前顺序为：

1. 六项原则 `principles-section`。
2. 三条路径 `home-intro`。
3. 知识生产方法 `home-band`。
4. 行动工具 `home-links`。
5. 公开贡献说明 `home-contribute`。

修改文字时保留现有标签和 `class`。例如，只修改 `<p>` 中的文字，不要误删对应的 `</p>`。

涉及区块增删、顺序变化或标签调整时，必须检查桌面端和手机端。

## 如何修改普通文章

### YAML 元数据

文章开头的 `---` 区域用于记录内容状态。常用字段包括：

```yaml
---
type: guide
status: draft
source: "[[SJTU STI Survival Manual 大纲]]"
verified: 2026-08-30
review_due: 2027-08-30
owner: 校团委科创协会
sensitivity: public
---
```

更新事实性内容时，同时更新：

- `updated`：本次修改日期。
- `verified`：来源核验日期。
- `review_due`：下次复审日期。
- `source`：新增或变更的来源。

不要把未核验信息写成事实。事实、经验和编辑建议的区分见 [[SJTU STI Wiki 内容模型与编辑规范]]。

### 标题和段落

- 每篇文章只使用一个一级标题 `#`。
- 主要章节使用 `##`，章节内部使用 `###`。
- 不要跳过标题层级。
- 标题要描述读者的问题或行动，不写空泛口号。
- 长段落尽量拆分，但不要把每句话都变成列表。

### Obsidian 双链

仓库支持：

```markdown
[[工具与模板库]]
[[工具与模板库#路径选择卡]]
[[科研路径：从进入实验室到形成学术资产|科研路径]]
```

注意：

- 双链中的笔记名必须与文件名一致，不含 `.md`。
- 不要创建同名笔记，否则网页无法确定目标。
- 链接到外部网站时使用标准 Markdown 链接。
- 构建时出现 `dead link` 必须修复，不能通过关闭检查绕过。

## 如何新增文章

1. 根据内容类型选择目录；当前公开指南放在 `draft/`。
2. 复制同类文章的 YAML 字段和正文结构。
3. 设置 `sensitivity: public` 前完成公开性检查。
4. 从至少一篇相关页面添加 `[[双链]]`，避免形成孤立页面。
5. 如果需要出现在侧栏，在 `.vitepress/config.mts` 的 `sidebar` 中增加入口。
6. 运行 `npm run docs:build` 检查路径和链接。

文件名修改会改变公网地址。已经公开的文章不要随意改名；确需改名时，应同步修改所有双链、导航和外部引用。

## 如何修改导航和侧栏

打开 `.vitepress/config.mts`：

- `nav` 控制顶部导航。
- `sidebar` 控制文章页左侧目录。
- `outline` 控制右侧本页目录。
- `socialLinks` 和 `editLink` 控制 GitHub 入口。

新增站内链接时使用：

```ts
{ text: '显示名称', link: '/draft/文件名' }
```

不要包含 `.md`，也不要加入 GitHub Pages 的仓库前缀。修改配置后必须重启或确认本地开发服务器已自动重启。

## 如何修改排版和视觉

全部自定义样式位于 `.vitepress/theme/custom.css`。

### 常用区域

| CSS 选择器 | 控制内容 |
| --- | --- |
| `:root`、`.dark` | 明暗主题的颜色、字体和尺寸变量 |
| `.VPHero` | 首页首屏背景、尺寸和构图 |
| `.principles-section` | 六项原则整体区域 |
| `.principle-groups`、`.principle-group` | 六项原则的三列或单列布局 |
| `.path-grid`、`.path-item` | 科研、创赛、创业三条路径 |
| `.home-band` | 事实、经验和建议区域 |
| `.home-links` | 行动工具入口 |
| `.home-contribute` | 页面底部公开贡献区域 |
| `@media (max-width: 959px)` | 平板和窄屏布局 |
| `@media (max-width: 720px)` | 手机布局 |

### 修改原则

- 优先修改已有 CSS 变量，不要在多处重复写颜色。
- 卡片圆角不超过 `8px`。
- 不使用外部字体服务，避免访问受限时排版失效。
- 不让标题、按钮或背景图互相遮挡。
- 固定格式元素使用稳定尺寸，避免内容变化造成页面跳动。
- 不只检查宽屏；至少检查 `1440×900` 和 `390×844`。
- 暗色模式必须单独检查文字、边框、Logo 和背景对比度。

如果无法确定某项 CSS 的影响范围，先在浏览器开发工具中临时调整，确认后再修改文件。

## 如何更换 Logo 和首页背景

### Logo

当前 Logo 文件为：

- `public/infinity-mark-light.svg`
- `public/infinity-mark-dark.svg`

引用位置在 `.vitepress/config.mts` 的 `themeConfig.logo`。

新 Logo 应满足：

- 同时提供浅色和深色版本。
- 使用紧凑 `viewBox`，避免导航栏出现多余空白。
- 不引用外部字体、脚本或图片。
- 保持在约 `25×25px` 的导航尺寸下可辨认。

### 首页背景

当前位图为 `public/growth-loop-hero.webp`，CSS 引用位于 `.VPHero`。

建议保持：

- 宽幅构图，当前为 `1800×1000`。
- 左侧为主文案保留清晰阅读区域。
- 手机裁切后仍能看见核心图形，但不能干扰文字。
- 使用 WebP 或经过压缩的 PNG/JPEG，避免文件过大。

更换文件名时，必须同步更新 `.vitepress/theme/custom.css` 中的路径。

## 审核与发布流程

推荐流程：

```text
提出修改 → 编辑与来源检查 → 本地构建 → 老师批准 → 合并 main → 自动部署 → 公网复核
```

### 提交前检查

- [ ] 修改目的明确，没有夹带无关改动。
- [ ] 事实、经验和编辑建议已经区分。
- [ ] 新增事实有来源和核验日期。
- [ ] 没有访谈原始材料或敏感信息。
- [ ] 所有内部链接可以打开。
- [ ] `npm run docs:build` 成功。
- [ ] 首页和视觉修改检查过桌面端、手机端和暗色模式。
- [ ] 公开内容已取得科协老师批准。

### 提交命令

```bash
git status
git add 修改过的文件
git commit -m "docs: 简要说明修改内容"
git push -u origin 当前分支名
```

在 GitHub 创建 Pull Request，完成审核后合并到 `main`。合并会触发 `.github/workflows/deploy.yml`，通常数分钟内更新公网网站。

### 发布后检查

1. 打开 [公网首页](https://rrrealcedric.github.io/SJTU-STI-Wiki/)。
2. 检查本次修改的页面和相关入口。
3. 检查 Logo、图片、导航和站内链接。
4. 打开 GitHub Actions，确认部署任务为绿色成功状态。
5. 如果浏览器仍显示旧内容，等待约十分钟或强制刷新，排除 CDN 缓存。

## 常见问题

### 构建报告 dead link

常见原因：文件改名、双链名称不一致、标题锚点变化或导航路径带有 `.md`。

处理方法：根据构建输出定位来源文件，修正链接后重新构建。不要设置 `ignoreDeadLinks: true` 掩盖问题。

### 图片显示为 404

检查：

- 文件是否放在 `public/`。
- 文件名大小写是否完全一致。
- CSS 或配置中的路径是否以 `/` 开头。
- 是否错误写入 `/SJTU-STI-Wiki/` 前缀。

### 本地正常，公网没有更新

检查 GitHub Actions 是否成功、修改是否已经合并到 `main`，以及 Pages 是否仍使用 GitHub Actions 作为发布来源。

### 手机出现横向滚动

通常是固定宽度、过长英文、表格或图片造成。检查 `390px` 宽度，并使用 `max-width: 100%`、响应式网格或允许文字换行。不要用隐藏整个页面溢出的方式掩盖问题。

### 首页按钮不能跳转

检查按钮 `link`、目标元素 `id` 和站内路径。首页锚点应写成 `/#目标-id`。

## 回退错误修改

已经推送的公共历史不要使用强制覆盖。优先创建一个反向提交：

```bash
git log --oneline
git revert 提交编号
git push
```

如果错误内容包含隐私、密钥或未授权材料，应立即停止传播并联系仓库负责人处理；普通 `revert` 不能从 Git 历史中彻底删除秘密。

## 建议维护节奏

- 每次内容变更：检查来源、链接和公开边界。
- 每月：抽查高访问页面和外部链接。
- 每学期：复核资源地图、赛事时间、维护人和 `review_due`。
- 每学年：检查 Node.js、VitePress 和 GitHub Actions 依赖是否需要升级。
- 视觉或结构大改：先形成设计说明和页面清单，获得确认后再集中修改。

## 我的理解

网站维护不是不断增加内容，而是让读者持续获得可信的下一步。任何修改都应回答三个问题：它解决了什么真实问题，依据是什么，维护成本是否值得承担。

## 相关链接

- [[SJTU STI Wiki 项目章程]]
- [[SJTU STI Wiki 内容模型与编辑规范]]
- [[SJTU STI Survival Manual 大纲]]
- [GitHub 仓库](https://github.com/RRRealCedric/SJTU-STI-Wiki)
- [公网网站](https://rrrealcedric.github.io/SJTU-STI-Wiki/)

## 后续行动

- 指定至少一名内容维护人和一名网站技术维护人。
- 用一次小型文案修改演练 Pull Request、审批、部署和公网复核流程。
- 将本手册纳入每学期交接清单，并在流程变化时同步更新。
