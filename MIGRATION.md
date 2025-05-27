# 从腾讯云DeepSeek API迁移到DeepSeek官方API

## 迁移概述

本项目已从腾讯云DeepSeek API迁移到DeepSeek官方API，以获得更好的稳定性、可靠性和直接的技术支持。

## 主要变更

### 1. API端点变更

- **旧端点**: `https://api.lkeap.cloud.tencent.com/v1/chat/completions`
- **新端点**: `https://api.deepseek.com/chat/completions`

### 2. API密钥获取方式

- **旧方式**: 在腾讯云控制台创建DeepSeek API密钥
- **新方式**: 在[DeepSeek平台](https://platform.deepseek.com/api_keys)直接创建API密钥

### 3. 请求头简化

- 移除了腾讯云特有的 `X-Request-ID` 请求头
- 保持标准的 `Authorization: Bearer <token>` 格式

## 迁移步骤

### 步骤1: 获取新的API密钥

1. 访问 [DeepSeek平台](https://platform.deepseek.com/api_keys)
2. 注册或登录账户
3. 创建新的API密钥
4. 复制并保存密钥

### 步骤2: 更新环境变量

修改您的 `.env` 文件：

```env
# 更新这些配置
AI_API_KEY=your_new_deepseek_api_key
AI_API_URL=https://api.deepseek.com/chat/completions
AI_API_MODEL=deepseek-v3-0324
```

### 步骤3: 测试API连接

运行测试脚本验证配置：

```bash
npm run test-api
```

如果看到 "✅ API测试成功！" 消息，说明迁移完成。

## 可用模型

DeepSeek官方API支持以下模型：

- `deepseek-v3-0324` - 最新的DeepSeek-V3模型（推荐）
- `deepseek-chat` - 标准对话模型（自动使用最新版本）
- `deepseek-reasoner` - DeepSeek-R1推理模型

## 优势

### 直接使用官方API的好处：

1. **更高稳定性** - 直接连接DeepSeek服务器，减少中间环节
2. **更好支持** - 可直接获得DeepSeek官方技术支持
3. **最新功能** - 第一时间获得新模型和功能更新
4. **成本透明** - 直接的定价结构，无中间商费用
5. **更高限额** - 官方API通常提供更高的调用限额

## 故障排除

### 常见问题：

**Q: API密钥无效错误**
A: 确保使用从DeepSeek平台获取的新密钥，而不是腾讯云的密钥

**Q: 网络连接失败**
A: 检查是否能正常访问 `https://api.deepseek.com`

**Q: 模型不存在错误**
A: 确认使用的模型名称正确，推荐使用 `deepseek-v3-0324`

**Q: 配额不足**
A: 登录DeepSeek平台检查账户余额和使用情况

## 支持

如果在迁移过程中遇到问题：

1. 首先运行 `npm run test-api` 诊断问题
2. 查看DeepSeek官方文档：https://api-docs.deepseek.com/
3. 联系DeepSeek官方支持

## 向后兼容

该迁移保持了完全的向后兼容性：

- 所有现有的生成功能保持不变
- 用户界面无任何变化
- 输出格式和质量保持一致
- 只需要更新环境变量配置
