import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth-guard.guard';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiBody,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    @ApiResponse({ status: 409, description: 'Conflict, email already in use.' })
    @ApiBody({ type: CreateAuthDto })
    create(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.create(createAuthDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful.' })
    @ApiResponse({ status: 401, description: 'Unauthorized, invalid credentials.' })
    @ApiBody({ type: LoginDto })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Get user profile' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized, invalid or missing token' })
    getProfile(@Request() req) {
        console.log('Profile accessed');
        return this.authService.getProfile(req.user);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'New access token generated successfully.' })
    @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
    @ApiBody({ schema: { properties: { refreshToken: { type: 'string', example: 'your-refresh-token' } } } })
    refreshToken(@Body('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }
}
