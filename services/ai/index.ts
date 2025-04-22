/**
 * AI服务索引
 * 根据环境变量决定使用真实服务还是模拟服务
 */

import * as mockService from './mock-service';
import * as realService from './infographic-service';

// 检查环境变量，决定使用哪个服务
const useMockService = process.env.USE_MOCK_SERVICE === 'true';

// 导出合适的服务函数
export const generateInfographic = useMockService 
  ? mockService.generateInfographic 
  : realService.generateInfographic;

export const checkGenerationStatus = useMockService
  ? mockService.checkGenerationStatus
  : realService.checkGenerationStatus; 