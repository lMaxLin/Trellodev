import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({ type: String, description: 'email', example: 'user@user.user',})
    @IsEmail()
    email!: string;

    @ApiProperty({ type: String, description: 'password'} )
    @IsString()
    password!: string;
}