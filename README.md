# 文本到信息图 - 实现计划

本项目是一个将文本内容转换为信息图的Web应用，使用AI技术自动生成高质量的信息图表示。

## 实现步骤

### 1. 创建提示词模板管理系统 [✓]
- [x] 创建`lib/ai/prompt-templates`目录
- [x] 从DOCS中的提示词模板创建TypeScript模板文件：
  - [x] `landscape-16-9.ts` (横版16:9)
  - [x] `a4-landscape.ts` (A4横版)
  - [x] `a4-portrait.ts` (A4竖版)
  - [x] `mobile.ts` (移动设备竖版750px)
- [x] 创建`index.ts`统一导出所有模板

### 2. 实现AI服务客户端 [✓]
- [x] 创建`lib/ai/api-client.ts`处理与AI服务通信
- [x] 创建`services/ai/infographic-service.ts`实现真实信息图生成服务
- [x] 添加必要的错误处理和重试逻辑

### 3. 实现提示词处理逻辑 [✓]
- [x] 创建`lib/ai/prompt-builder.ts`构建完整提示词
- [x] 实现根据用户选择(处理模式和尺寸)选择适当模板的逻辑
- [x] 将用户输入的文本与模板结合的处理函数

### 4. 更新API端点 [✓]
- [x] 修改`app/api/infographic/route.ts`使用真实AI服务
- [x] 实现异步处理逻辑，支持长时间运行的生成任务
- [x] 完善错误处理和状态返回

### 5. 增强前端预览功能 [✓]
- [x] 确保前端正确显示AI生成的HTML内容
- [x] 实现安全的iframe预览系统
- [x] 添加导出为不同格式的功能

## 技术要点
- 使用腾讯云DeepSeek-V3-0324或其他AI服务生成HTML格式的信息图
- 根据用户选择的处理模式(全文/总结)和尺寸选择合适的提示词
- 确保生成的信息图适合所选尺寸，且内容完整
- 提供PNG、JPG和PDF格式导出

## 使用说明

### 环境变量配置
复制`.env.example`到`.env`，并配置以下变量：
- `AI_API_KEY`: 腾讯云DeepSeek API的密钥（在腾讯云控制台创建）
- `AI_API_URL`: API端点（默认为`https://api.lkeap.cloud.tencent.com/v1/chat/completions`）
- `AI_API_MODEL`: 使用的模型（可选值：`deepseek-v3-0324`, `deepseek-v3`, `deepseek-r1`，默认为`deepseek-v3-0324`）
- `USE_MOCK_SERVICE`: 设为`true`使用模拟服务(开发测试用)，设为`false`使用真实AI服务

### 腾讯云DeepSeek API说明
本项目使用腾讯云DeepSeek API生成信息图。DeepSeek-V3-0324模型具有以下特点：
- 671B参数MoE模型，在编程与技术能力、上下文理解与长文本处理等方面优势突出
- 支持128K上下文长度，最大输出16k
- 通过OpenAI兼容接口调用，便于集成

### 开发环境运行
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 测试信息图生成
1. 访问http://localhost:3000/create
2. 输入或粘贴文本
3. 选择处理模式(全文/总结)和输出尺寸
4. 点击"生成信息图"
5. 等待处理完成，预览生成的信息图
6. 导出为需要的格式