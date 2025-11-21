import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { JwtPayload } from '../types';

export const generateToken = (userId: number, email: string, role: string): string => {
  const payload: JwtPayload = {
    userId,
    email,
    role,
  };

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.jwt.secret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
