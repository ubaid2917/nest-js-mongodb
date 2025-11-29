import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth-guard.guard';

@Controller('auth')
export class AuthController { 
    constructor(
        private readonly authService: AuthService,
    ){}   

    @Post()
    create(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.create(createAuthDto);
    }  

    @Post('login') 
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }   
     
    @UseGuards(AuthGuard)
    @Get('profile') 
    getProfile(@Request() req){ 
        console.log('Profile accessed');
        return this.authService.getProfile(req.user);
    }
}
