import * as jwt from 'jsonwebtoken';

export function generateToken(payload: object): string {
    const secretKey = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

    return jwt.sign(payload, secretKey, { expiresIn });

}