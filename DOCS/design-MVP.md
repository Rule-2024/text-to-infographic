# 文本到信息图 - MVP技术设计文档

## 项目目录结构

```
text-to-infographic/
├── .env                    # 环境变量配置（API密钥等）
├── .env.example            # 环境变量示例文件
├── .gitignore              # Git忽略文件
├── package.json            # 项目依赖和脚本
├── tsconfig.json           # TypeScript配置
├── next.config.js          # Next.js配置
├── tailwind.config.js      # Tailwind CSS配置
├── postcss.config.js       # PostCSS配置
├── middleware.ts           # Next.js中间件（语言检测等）
├── next-sitemap.config.js  # 站点地图配置
├── public/                 # 静态资源目录
│   ├── favicon.ico         # 网站图标
│   ├── robots.txt          # 搜索引擎规则
│   ├── sitemap.xml         # 站点地图
│   └── assets/             # 其他静态资源
│       ├── images/         # 图片资源
│       └── examples/       # 示例信息图
├── app/                    # Next.js应用目录
│   ├── layout.tsx          # 主布局组件
│   ├── page.tsx            # 首页
│   ├── error.tsx           # 错误处理
│   ├── loading.tsx         # 加载状态
│   ├── not-found.tsx       # 404页面
│   ├── metadata.ts         # 基础元数据配置
│   ├── create/             # 创建信息图流程
│   │   ├── page.tsx        # 文本输入页面
│   │   ├── components/     # 页面特定组件
│   │   └── loading.tsx     # 加载状态
│   ├── processing/         # 处理页面
│   │   ├── page.tsx        # 处理状态页面
│   │   └── components/     # 处理相关组件
│   ├── preview/            # 预览页面
│   │   ├── page.tsx        # 预览信息图页面
│   │   ├── [id]/           # 分享链接预览
│   │   └── components/     # 预览相关组件
│   ├── auth/               # 身份验证（仅MVP预留）
│   │   ├── sign-in/        # 登录页面
│   │   ├── sign-up/        # 注册页面
│   │   └── components/     # 身份验证组件
│   └── api/                # API路由
│       ├── infographic/    # 信息图相关API
│       ├── auth/           # 身份验证API（预留）
│       └── share/          # 分享链接API
├── components/             # 全局共享组件
│   ├── ui/                 # UI组件（通过shadcn/ui）
│   ├── layout/             # 布局组件
│   │   ├── header.tsx      # 页头
│   │   ├── footer.tsx      # 页脚
│   │   └── navigation.tsx  # 导航栏
│   ├── form/               # 表单组件
│   ├── feedback/           # 反馈组件
│   └── infographic/        # 信息图相关组件
├── lib/                    # 公用工具和函数
│   ├── types/              # TypeScript类型定义
│   ├── utils/              # 通用工具函数
│   ├── hooks/              # 自定义React Hooks
│   ├── schemas/            # 数据验证模式
│   ├── constants/          # 常量定义
│   └── ai/                 # AI相关工具
│       ├── prompt-templates/  # 提示词模板
│       ├── content-processor.ts  # 内容处理器
│       └── api-client.ts    # AI API客户端
├── styles/                 # 样式相关
│   ├── globals.css         # 全局样式
│   └── theme.ts            # 主题配置
├── config/                 # 配置文件
│   ├── site.ts             # 站点配置
│   ├── navs.ts             # 导航配置
│   └── features.ts         # 功能标志配置
└── services/               # 服务层
    ├── db/                 # 数据库服务
    ├── ai/                 # AI服务
    └── export/             # 导出服务
```

## 技术栈详解

### 1. 前端技术栈

- **核心框架**：Next.js 14+ (App Router) + TypeScript
- **UI组件库**：Shadcn UI + Radix UI
- **样式解决方案**：Tailwind CSS
- **状态管理**：
  - React Server Components (RSC) 作为主要状态容器
  - React Context API 用于客户端状态
  - URL 状态参数管理使用 `nuqs`
- **表单处理**：React Hook Form + Zod验证
- **客户端组件策略**：
  - 最小化使用客户端组件
  - 使用`use client`指令标记需要客户端交互的组件
  - 确保客户端组件轻量、职责单一

### 2. 后端技术栈

- **API路由**：Next.js API Routes (Route Handlers)
- **数据库**：Supabase（PostgreSQL + API层）
- **认证服务**：Supabase Auth（MVP阶段预留）
- **AI服务集成**：
  - 预留对接多种AI服务的接口设计
  - 适配器模式以支持不同AI提供商
- **文件处理**：
  - 上传：client-side解析 + server-side验证
  - 导出：通过服务端API生成

### 3. 核心功能模块设计

#### 用户界面模块

- **组件设计**：采用原子化设计系统，确保组件可重用性
- **响应式策略**：移动优先的布局设计，使用Tailwind断点系统
- **交互模式**：
  - 每页一个主要任务
  - 清晰的进度指示
  - 适当的反馈机制

#### 文本处理模块

- **输入处理**：
  - 文本清理和格式化
  - 语言检测（使用`languagedetect`或类似库）
- **文件解析**：
  - 前端文件类型检测和初步解析
  - 支持.txt、.docx、.pdf格式

#### AI处理模块

- **提示词系统**：
  - 提示词模板化管理，存储于`lib/ai/prompt-templates/`
  - 针对不同处理模式和尺寸的专用提示词变体
  - 优化提示词以使DeepSeek生成HTML/CSS格式的信息图
- **API调用**：
  - 封装的API客户端服务
  - 请求排队和重试策略
  - 错误处理和回退机制
  - 处理并保存DeepSeek返回的HTML内容

#### 信息图渲染模块

- **HTML预览系统**：
  - 使用安全的iframe渲染DeepSeek生成的HTML内容
  - 实现HTML内容净化，防止XSS攻击
  - 使用Content Security Policy限制iframe权限
  - 创建响应式的iframe容器适应不同设备大小
- **格式转换系统**：
  - HTML到图像转换服务：
    - 服务端集成Puppeteer/Playwright进行高质量渲染
    - 支持不同分辨率和比例的截图生成
  - HTML到PDF转换服务：
    - 服务端PDF生成确保高质量输出
    - 添加适当的元数据和页眉页脚
  - 客户端备选方案：
    - 使用html2canvas和jsPDF作为备选导出方案
    - 在服务端渲染不可用时提供降级体验
- **导出系统**：
  - 多格式支持（PNG、JPG、PDF）
  - 临时下载链接生成
  - 生成文件名和元数据管理

#### 数据存储模块

- **数据模型**：
  - `generations`表：存储生成记录
  - `users`表：预留用户信息（MVP阶段未启用）
  - `assets`表：存储生成的资产URL
- **匿名用户处理**：
  - 使用sessionStorage存储临时会话信息
  - 可选的IP哈希标识用于统计

### 4. 国际化与SEO策略

- **语言处理**：
  - 界面仅支持英文
  - 自动检测用户输入语言
  - 输出相应语言的信息图
- **SEO优化**：
  - 使用Next.js Metadata API动态管理元数据
  - 实现结构化数据（Schema.org类型）
  - 自动生成站点地图
  - 针对关键词优化的内容结构
- **内容策略**：
  - 围绕核心关键词设计页面内容
  - H1、H2等标题标签合理使用关键词
  - 图像alt文本优化

### 5. 性能优化策略

- **Suspense与流式渲染**：
  - 为长时间操作（如AI处理）设置Suspense边界
  - 实现流式UI更新以提高用户体验
- **资源优化**：
  - 图像使用Next.js Image组件自动优化
  - 使用`font-display: swap`和字体预加载
  - 代码分割和动态导入非关键组件
- **监控与衡量**：
  - 集成Core Web Vitals监控
  - 性能预算设定和监控

### 6. 安全性考虑

- **输入验证**：
  - 前端和后端双重验证
  - Zod模式验证所有用户输入
- **API保护**：
  - 限速以防止滥用
  - API密钥安全存储在环境变量中
- **内容审核**：预留内容审核接口（MVP阶段未实现）

### 7. 可扩展性设计（预留未来功能）

- **用户系统扩展**：
  - 预留用户表和认证流程
  - 认证组件和页面已基础搭建
- **模板系统**：
  - 目录结构预留模板相关组件
  - 数据模型考虑模板存储需求
- **个性化设置**：
  - 组件设计预留样式自定义接口
  - 配置系统支持特性开关

## 技术依赖

### 核心依赖

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    
    // UI组件库
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-dialog": "^1.0.4",
    "@radix-ui/react-dropdown-menu": "^2.0.5",
    
    // 样式
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.24",
    "autoprefixer": "^10.4.14",
    "class-variance-authority": "^0.6.0",
    "clsx": "^1.2.1",
    "tailwind-merge": "^1.13.2",
    
    // 表单和验证
    "react-hook-form": "^7.45.1",
    "zod": "^3.21.4",
    "@hookform/resolvers": "^3.1.1",
    
    // 状态管理
    "nuqs": "^1.8.0",
    
    // 多语言支持
    "next-intl": "^3.0.0-beta.9",
    "languagedetect": "^2.0.0",
    
    // 文件处理
    "react-dropzone": "^14.2.3",
    "pdf-parse": "^1.1.1",
    "mammoth": "^1.6.0",
    
    // 数据库
    "@supabase/supabase-js": "^2.26.0",
    
    // 工具
    "date-fns": "^2.30.0",
    "lodash": "^4.17.21",
    "uuid": "^9.0.0",
    "nanoid": "^4.0.2",
    "js-file-download": "^0.4.12",
    
    // HTML到图像/PDF转换
    "puppeteer": "^21.0.0",
    "html-to-image": "^1.11.0",
    "jspdf": "^2.5.1",
    "dompurify": "^3.0.5",
    "html-to-text": "^9.0.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.14",
    "@types/react-dom": "^18.2.6",
    "@types/node": "^20.3.3",
    "@typescript-eslint/eslint-plugin": "^5.60.1",
    "@typescript-eslint/parser": "^5.60.1",
    "eslint": "^8.44.0",
    "eslint-config-next": "^13.4.8",
    "prettier": "^2.8.8",
    "prettier-plugin-tailwindcss": "^0.3.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.2.3"
  }
}
```

## 开发规范

1. **代码风格**：使用ESLint和Prettier确保一致的代码风格
2. **组件命名**：
   - 页面组件：`page.tsx`
   - 布局组件：`layout.tsx` 
   - 客户端组件：使用PascalCase并在文件顶部添加`'use client'`
   - 服务器组件：默认所有组件为服务器组件，除非明确标记
3. **目录结构**：
   - 功能优先的目录组织
   - 共享组件放在`components/`
   - 页面特定组件放在对应页面目录下的`components/`子目录
4. **状态管理**：
   - 尽可能使用React Server Components
   - 对于客户端状态，使用React Context或简单的React状态钩子
   - URL参数用于可分享的状态
5. **API设计**：
   - RESTful API设计原则
   - 清晰的错误处理
   - 适当的HTTP状态码

## 未来扩展计划

已在当前架构中预留以下功能的扩展点：

1. **用户账户系统**：
   - 数据库模型已预留用户相关字段
   - 身份验证页面和组件已基础搭建
   - 已准备好与匿名生成记录关联的机制

2. **模板系统**：
   - 目录结构支持添加模板相关模块
   - 提示词系统设计为可扩展以支持模板定制

3. **自定义设置**：
   - 组件设计考虑样式定制的扩展性
   - UI组件库选择支持主题和变体

4. **高级分析**：
   - 数据模型支持添加分析用字段
   - 预留管理界面的集成点

5. **付费功能**：
   - 架构设计考虑功能分级
   - 用户系统支持权限管理 