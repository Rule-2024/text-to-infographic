/**
 * AI Service Index
 * Determine whether to use real service or mock service based on environment variables
 */

import * as mockService from './mock-service';
import * as realService from './infographic-service';

// Check environment variables to determine which service to use
const useMockService = process.env.USE_MOCK_SERVICE === 'true';

// Export appropriate service functions
export const generateInfographic = useMockService
  ? mockService.generateInfographic
  : realService.generateInfographic;

export const checkGenerationStatus = useMockService
  ? mockService.checkGenerationStatus
  : realService.checkGenerationStatus;