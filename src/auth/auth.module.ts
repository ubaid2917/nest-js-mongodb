import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module'; 
import { AuthSchema } from './entities/auth.entity';

@Module({ 
  imports: [
    MongooseModule.forFeature([{
      name: Auth.name,
      schema: AuthSchema
    }]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
