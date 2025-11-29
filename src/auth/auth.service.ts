import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { generateAccessToken, generateRefreshToken } from '../common/jwt.utils';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private authModel: Model<Auth>,
    ) { }

    // hashed password
    async hashedPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    }

    // create auth
    async create(createAuthDto: CreateAuthDto): Promise<Auth> {
        createAuthDto.password = await this.hashedPassword(createAuthDto.password);

        const auth = new this.authModel(createAuthDto);
        return auth.save();
    }

    // login 
    async login(loginDto: LoginDto): Promise<any> {
        const auth = await this.authModel.findOne({ email: loginDto.email });
        if (!auth) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatching = await bcrypt.compare(loginDto.password, auth.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // generate token  
        const accessToken = generateAccessToken({ id: auth._id, email: auth.email });
        const refreshToken = generateRefreshToken({ id: auth._id });

        auth.refreshToken = refreshToken;
        await auth.save();

        return {
            message: 'Login successful',
            data: {
                user: { id: auth._id, email: auth.email },
                accessToken,
                refreshToken
            }
        };

    }

    // get profile 
    async getProfile(user): Promise<Auth | null> {
        return this.authModel.findById({ _id: user.id });
    }

    // refresh token 
    async refreshToken(refreshToken: string): Promise<any> {
        try {
            const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const auth = await this.authModel.findById(decoded.id);

            if (!auth || auth.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

            const newAccessToken = generateAccessToken({ id: auth._id, email: auth.email });
            const newRefreshToken = generateRefreshToken({ id: auth._id });

            auth.refreshToken = newRefreshToken;
            await auth.save();

            return {
                message: 'Token refreshed successfully',
                data: {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                }
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
