# GreenTail Architecture & Specifications

## 1. 架构与技术栈 (Architecture & Tech Stack)

### 1.1 关键架构组件 (Key Components)
GreenTail 采用 **Client-Serverless** 架构，并使用 React 构建单页应用（SPA）。核心组件如下：

- **Frontend Client (React SPA)：** 负责用户界面、路由、状态管理（例如测验进度）以及 Eco-Score 计算逻辑。
- **Static Data Layer (Mock JSON)：** 储存所有产品信息和预计算的 Eco-Score，作为 MVP 阶段的只读数据源，由前端直接导入。
- **Persistent Storage (Firebase Firestore)：** 用于保存用户测验结果、愿望清单等需要持久化的写入数据，同时管理用户会话信息。

### 1.2 技术栈 (Tech Stack)
| 类型 | 技术 | 目的 |
| :--- | :--- | :--- |
| **语言** | JavaScript (ES6+), HTML, CSS | 核心开发语言 |
| **框架** | **React** | 支持复杂组件（例如测验流程 F2.0）与高效的动态状态管理 |
| **样式** | **Tailwind CSS** | 快速构建响应式界面 |
| **数据库** | **Firebase Firestore** | NoSQL 数据库存储用户测验结果等结构化数据（F7.0） |
| **托管** | **Render / GitHub Pages** | 发布静态 SPA 的首选平台 |
| **工具** | **Git / GitHub, Figma** | 版本控制（采用 Git Rebasing 以保持历史清晰）与协作设计 |

### 1.3 功能交互与代码维护 (Feature Interaction & Maintenance)
- **状态管理：** 使用 React Context 维护全局用户状态（如测验数据、偏好设置），局部交互使用组件内部状态。
- **交互流程：** 测验组件（F2.0）收集输入并写入 Firestore。搜索结果组件（F4.0）同时读取静态产品数据和 Firestore 中的用户画像，以执行个性化推荐。
- **代码组织：**
  - `components/`：可复用 UI 元件。
  - `pages/`：页面级视图。
  - `data/`：静态 JSON 产品数据。
  - `services/`：封装 Firebase 读写逻辑。

## 2. 数据与后端 (Data & Backend)

### 2.1 托管方案 (Hosting)
应用作为静态 SPA 部署在 Render 或 GitHub Pages，无需维护独立服务器。

### 2.2 数据模型 (Firestore Collections)
| Collection | Document Key | Fields | Purpose |
| :--- | :--- | :--- | :--- |
| `users` | UserID (UID) | `pet_type`, `dietary_restrictions`, `eco_priority`, `last_quiz_date` | 保存用户档案与测验结果（F2.0），支持个性化推荐 |
| `wishlists` | UserID (UID) | `saved_product_ids` (Array), `date_added` | 存储愿望清单中的产品（P2） |

### 2.3 后端接口 (Backend Endpoints)
MVP 阶段不需要自建后端或 REST API。核心逻辑完全由客户端处理：
- **读取产品数据：** React 客户端直接导入静态 JSON。
- **写入用户数据：** React 客户端通过 Firebase SDK 与 Firestore 通信。

## 3. 测试与验证 (Testing & Validation)

| Feature Test Case | Description | Expected Result |
| :--- | :--- | :--- |
| **F1.0 Eco-Score Calculation** | 使用高可持续性配置的虚拟产品验证评分函数 | Eco-Score 应达到 **4.0 或更高** |
| **F2.0 Quiz & Data Write** | 完成五步测验 | 完整数据写入 Firestore `users` 集合 |
| **F3.0 Search & Sort** | 搜索 "Chicken" 并按 Eco-Score 降序排序 | 最高分产品优先显示 |
| **F4.0 Recommendation Logic** | 完成测验选择 "Kitten" 且 "High Eco-Priority" | 展示面向幼猫且高 Eco-Score 的产品 |
| **F6.0 Detail Transparency** | 查看任意产品详情 | 显示 Eco-Score 分解表，满足透明度需求 |

## 4. 关键设计决策 (Key Design Decision)
我们决定在 MVP 阶段使用 **硬编码的 Mock JSON 数据** 管理产品与 Eco-Score 信息，而不是引入第三方 API 或 Firestore 存储产品数据。这样能将研发重点放在 **Eco-Score 计算与个性化推荐**，降低数据来源的风险与复杂度，确保 P0 功能（测验与评分）快速迭代验证。
