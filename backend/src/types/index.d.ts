import cookieSession from 'cookie-session';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}