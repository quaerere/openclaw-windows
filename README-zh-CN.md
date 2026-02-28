# 🦞 OpenClaw — 可在 Windows 上部署的版本

本仓库为 [OpenClaw](https://github.com/openclaw/openclaw) 的 **Windows 原生支持** 分支，在 **Windows 10/11** 上无需 WSL 即可完成克隆、安装与构建。

---

## 环境要求

- **操作系统**：Windows 10 或 Windows 11  
- **Node.js**：22 或更高版本（[下载](https://nodejs.org/) 或使用 `winget install OpenJS.NodeJS.LTS`）  
- **pnpm**：建议使用 pnpm 作为包管理器（安装：`npm install -g pnpm`）  
- **终端**：PowerShell 或 Windows Terminal  

---

## 操作步骤

### 第一步：克隆本仓库

在 PowerShell 中执行：

```powershell
git clone https://github.com/quaerere/openclaw-windows.git
cd openclaw-windows
```

若 Git 提示目录所有权/安全目录，可执行（仅需一次）：

```powershell
git config --global --add safe.directory C:/你的路径/openclaw-windows
```

将 `C:/你的路径/openclaw-windows` 替换为实际克隆到的目录路径。

---

### 第二步：安装依赖

在项目根目录执行：

```powershell
pnpm install
```

等待依赖安装完成。若未安装 pnpm，可先执行：`npm install -g pnpm`。

---

### 第三步：构建项目

在项目根目录执行：

```powershell
pnpm build
```

构建会编译 TypeScript、打包 A2UI 等，**无需安装 bash**，在 Windows 上可直接完成。

---

### 第四步：运行与配置

- **开发模式运行 CLI**（使用当前源码）：

  ```powershell
  pnpm openclaw --help
  ```

- **首次配置（推荐）**：运行引导向导，配置网关、频道、技能等：

  ```powershell
  pnpm openclaw onboard
  ```

- **启动网关**（例如端口 18789）：

  ```powershell
  pnpm openclaw gateway run --port 18789
  ```

- **全局安装后使用**（可选）：在项目根目录执行 `npm link` 或 `pnpm link --global` 后，可在任意目录使用 `openclaw` 命令。

---

## 步骤小结

| 步骤 | 命令 |
|------|------|
| 1. 克隆 | `git clone https://github.com/quaerere/openclaw-windows.git` → `cd openclaw-windows` |
| 2. 安装依赖 | `pnpm install` |
| 3. 构建 | `pnpm build` |
| 4. 配置与运行 | `pnpm openclaw onboard` → `pnpm openclaw gateway run --port 18789` |

按上述顺序执行即可在 Windows 上完成从克隆到运行的全流程。

---

## 与上游的差异说明

本仓库在保持与 [openclaw/openclaw](https://github.com/openclaw/openclaw) 同步的基础上，针对 **Windows 环境** 做了适配，便于在无 WSL 的 Windows 上使用：

- **构建**：使用 Node 脚本 `scripts/bundle-a2ui.mjs` 替代依赖 bash 的脚本，在 Windows 上可直接执行 `pnpm build`。  
- **插件安装**：在 Windows 上调用 npm 时使用 `shell: true`，避免 Node 20.12+ 下 spawn `.cmd` 报错（如 `spawn EINVAL`），便于安装飞书等插件。  

更多功能与文档请参考上游 [OpenClaw 官网](https://openclaw.ai) 与 [官方文档](https://docs.openclaw.ai)。

---

## 常用链接

- 上游仓库：[openclaw/openclaw](https://github.com/openclaw/openclaw)  
- 官方文档：[docs.openclaw.ai](https://docs.openclaw.ai)  
- 入门指南：[Getting started](https://docs.openclaw.ai/start/getting-started)  
- 许可证：[LICENSE](LICENSE)（MIT）  
