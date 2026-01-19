import { ApiProperty } from '@nestjs/swagger';

class UserResponseDto {
    @ApiProperty()
    id!: number;

    @ApiProperty({ example: 'user@user.com'})
    email!: string;

    @ApiProperty({ required: false })
    name?: string;
}

export class AuthResponseDto{
    @ApiProperty({ example: 'jwt_token_here'})
    accessToken!: string;

    @ApiProperty({ type: UserResponseDto })
    user!: UserResponseDto;
}