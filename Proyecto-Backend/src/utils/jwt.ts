import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura_aqui_2025_nasera_moda';

export interface JwtPayload {
  userId: string;
  email: string;
  userType: string;
  companyName: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): JwtPayload => {d
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};