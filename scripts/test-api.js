#!/usr/bin/env node

/**
 * DeepSeek API 测试脚本
 * 用于验证API配置是否正确
 */

require('dotenv').config();

const API_KEY = process.env.AI_API_KEY;
const API_URL = process.env.AI_API_URL || 'https://api.deepseek.com/chat/completions';
const MODEL = process.env.AI_API_MODEL || 'deepseek-v3-0324';

async function testDeepSeekAPI() {
  if (!API_KEY) {
    console.error('❌ AI_API_KEY 未配置！请在.env文件中设置您的DeepSeek API密钥');
    console.log('获取API密钥：https://platform.deepseek.com/api_keys');
    process.exit(1);
  }

  console.log('🧪 正在测试DeepSeek API连接...');
  console.log(`📡 API端点: ${API_URL}`);
  console.log(`🤖 模型: ${MODEL}`);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello! Please respond with "API test successful"' }
        ],
        temperature: 0.7,
        max_tokens: 50,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`❌ API请求失败: HTTP ${response.status}`);
      console.error('错误详情:', JSON.stringify(errorData, null, 2));
      
      if (response.status === 401) {
        console.log('💡 提示: 请检查您的API密钥是否正确');
      } else if (response.status === 429) {
        console.log('💡 提示: API调用频率过高，请稍后重试');
      }
      
      process.exit(1);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;

    if (message) {
      console.log('✅ API测试成功！');
      console.log(`🤖 模型响应: ${message}`);
      console.log('✨ 您的DeepSeek API配置正确，可以开始使用了！');
    } else {
      console.log('⚠️  API响应格式异常');
      console.log('响应数据:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('❌ 网络错误:', error.message);
    console.log('💡 请检查您的网络连接和API端点配置');
    process.exit(1);
  }
}

// 运行测试
testDeepSeekAPI(); 