# 通过 Markdown 定义 OpenClaw 人格

OpenClaw 通过工作区根目录下的 **Markdown 文件** 定义智能体的身份、风格和原则。每次会话开始时，这些文件会被注入为上下文，智能体会按其中的设定回复。

---

## 1. 工作区位置

人格相关文件放在 **智能体工作区** 的根目录：

- **默认路径**：`~/.openclaw/workspace`（Windows 为 `C:\Users\你的用户名\.openclaw\workspace`）
- 若配置了 `OPENCLAW_PROFILE` 且不为 `default`，则为：`~/.openclaw/workspace-<profile>`
- 也可在配置里用 `agents.defaults.workspace` 指定其他目录

首次运行 `openclaw onboard` 或首次启动智能体时，若工作区为空，会自动创建并写入模板文件（含 `IDENTITY.md`、`SOUL.md` 等）。

---

## 2. 用哪些 .md 文件定义人格（对应你图片里的结构）

### 2.1 `IDENTITY.md` — 基本身份和风格

- **作用**：名字、物种/类型、整体气质、代表 emoji、头像等「是谁」的基础信息。
- **位置**：工作区根目录，命名为 `IDENTITY.md`。
- **示例内容**（按需修改）：

```markdown
# IDENTITY.md - 我是谁？

- **Name:** 小爪
- **Creature:** AI 助手 / 机器人 / 小精灵（选一个你喜欢的）
- **Vibe:** 简洁、靠谱、带点幽默
- **Emoji:** 🦞
- **Avatar:** avatars/openclaw.png
```

保存后，智能体会在会话中体现这个名字、气质和 emoji。

---

### 2.2 `SOUL.md` — 更深层的价值观和原则

- **作用**：人格内核、原则、边界、语气、什么该做/不该做。相当于「灵魂」设定。
- **位置**：工作区根目录，命名为 `SOUL.md`。
- **示例结构**（可参考仓库里的模板 `docs/reference/templates/SOUL.md`）：

```markdown
# SOUL.md - 你是谁

## 核心原则
- 真心帮忙，不堆砌客套话。
- 可以有立场、偏好，不必永远中立。
- 先自己查、读文件、搜一搜，再问人。
- 私密信息绝不外泄；对外动作前先问一句。

## 边界
- 私人内容不对外。
- 不确定时先问再行动。
- 不向聊天渠道发送半成品回复。

## 语气
简洁时简洁，该细说时细说；不官腔、不讨好，做让人愿意聊的助手。
```

每次会话都会读取 `SOUL.md`，智能体会按其中的原则和语气回复。

---

### 2.3 关于「详细人格维度」与 `PERSONALITY.md`

你图片里提到的 **PERSONALITY.md（详细人格维度）** 在当前 OpenClaw 中 **不会** 被自动加载。官方会注入的引导文件只有：`AGENTS.md`、`SOUL.md`、`TOOLS.md`、`IDENTITY.md`、`USER.md`、`HEARTBEAT.md`、`BOOTSTRAP.md`、`MEMORY.md`、`memory.md`。

两种做法：

1. **推荐**：把「详细人格维度」写进 **SOUL.md**，例如增加一节：
   ```markdown
   ## 人格维度
   - 开放性：高，愿意尝试新思路。
   - 尽责性：高，答应的事会跟进到底。
   - 外向性：中等，在群聊里不抢话，被 @ 时认真回复。
   ```
2. 若你希望单独保留一个 `PERSONALITY.md` 文件：可以当笔记放在工作区，并在 **SOUL.md** 里写一句「人格细节见 PERSONALITY.md，会话前可自行读取」。当前版本不会自动把 `PERSONALITY.md` 注入为系统上下文，但智能体可以通过文件工具在会话中打开它。

---

## 3. 操作步骤小结

| 步骤 | 说明 |
|------|------|
| 1 | 确认工作区路径（默认 `~/.openclaw/workspace` 或 Windows 下 `%USERPROFILE%\.openclaw\workspace`） |
| 2 | 在工作区根目录创建/编辑 **IDENTITY.md**：名字、Creature、Vibe、Emoji、头像等 |
| 3 | 在工作区根目录创建/编辑 **SOUL.md**：原则、边界、语气；可选加「人格维度」一节 |
| 4 | （可选）在工作区放 **PERSONALITY.md** 作补充，并在 SOUL.md 中说明「详见 PERSONALITY.md」 |
| 5 | 重启或新开会话，智能体会按这些 .md 的人格设定回复 |

---

## 4. 相关文档

- 工作区与文件说明：[Agent workspace](https://docs.openclaw.ai/concepts/agent-workspace)（英文）
- 系统提示与引导文件：[System prompt](https://docs.openclaw.ai/concepts/system-prompt)（英文）
- 模板文件：仓库内 `docs/reference/templates/IDENTITY.md`、`docs/reference/templates/SOUL.md`
