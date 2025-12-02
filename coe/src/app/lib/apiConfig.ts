// API Configuration - Switch between fake and real AWS API
export const API_CONFIG = {
  // Set to false to use real AWS API, true for fake local data
  USE_FAKE_API: true,
  
  // Real AWS API endpoints (set these when AWS is ready)
  AWS_API_BASE: process.env.NEXT_PUBLIC_AWS_API_BASE || 'https://your-aws-api.amazonaws.com',
  
  // Fake API settings
  SIMULATE_NETWORK_DELAY: true,
  NETWORK_DELAY_MS: 200,
  
  // Debug settings
  LOG_API_CALLS: true,
  SHOW_FAKE_DATA_BANNER: true,
} as const;

// API endpoint resolver
export const getApiEndpoint = (endpoint: string) => {
  if (API_CONFIG.USE_FAKE_API) {
    // Use local Next.js API routes
    return `/api/${endpoint}`;
  } else {
    // Use real AWS API
    return `${API_CONFIG.AWS_API_BASE}/${endpoint}`;
  }
};

// Utility to log API calls for debugging
export const logApiCall = (endpoint: string, type: 'fake' | 'aws') => {
  if (API_CONFIG.LOG_API_CALLS) {
    console.log(`🔌 API Call: ${endpoint} (using ${type} data)`);
  }
};