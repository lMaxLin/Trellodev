import { IsEmail, IsString, IsNotEmpty ,IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ type: String, description: 'email', example: 'user@user.user',})
    @IsEmail()
    email!: string;

    @ApiProperty({ type: String, description: 'password'} )
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string

    @ApiProperty({ type: String, description: 'name' , required: false })
    @IsOptional()
    @IsString()
    name?: string
}
