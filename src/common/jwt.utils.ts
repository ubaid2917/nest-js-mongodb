import * as jwt from 'jsonwebtoken';

export function generateAccessToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}  

export function generateRefreshToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
}