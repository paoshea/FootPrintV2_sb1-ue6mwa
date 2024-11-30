import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  rateLimit: {
    windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // Default 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || 100), // Default 100 requests per windowMs
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
  fileUpload: {
    maxSize: parseInt(process.env.MAX_FILE_SIZE || 5242880), // Default 5MB
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,application/pdf').split(','),
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || 3600), // Default 1 hour
  },
};

export default config;