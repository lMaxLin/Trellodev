import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class RegisterDto {
    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password!: string

    @ApiProperty({ required: false })
    @IsString()
    name?: string
}

class LogidDto {

    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsString()
    password!: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register'})
    @UsePipes(new ValidationPipe({ whitelist: true}))
    register(@Body() dto: RegisterDto) {
        return this.auth.register(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login'})
    @UsePipes(new ValidationPipe({ whitelist: true }))
    login(@Body() dto: LogidDto) {
        return this.auth.login(dto.email, dto.password);
    }
}
