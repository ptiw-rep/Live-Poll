export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};