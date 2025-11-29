 import { IsEmail, IsNotEmpty, IsString } from 'class-validator'; 
 import { ApiProperty } from '@nestjs/swagger';
export class CreateAuthDto {
    @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({})
    name: string;
     
    @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;
    
    @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({})
    password: string;
}