import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8003;
export const MongoDBURL = process.env.MONGODB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;