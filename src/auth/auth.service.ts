import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { AuthResponseDto } from "./dto/auth-response.dto";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService) {}

    async register(dto: RegisterDto): Promise<AuthResponseDto> {
        const exists = await User.query().findOne({ email: dto.email });
        if (exists) throw new BadRequestException('Email already exists');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await User.query().insert({
            email: dto.email,
            password: hashed,
            name: dto.name,
        });
        return this.buildResponse(user);
    }

    async login(dto: LoginDto): Promise<AuthResponseDto> {
        const user = await User.query().findOne({ email: dto.email });
        if (!user) throw new BadRequestException('Invalid credentials');

        const ok = await bcrypt.compare( dto.password, user.password );
        if (!ok) throw new BadRequestException('Invalid credentials');
        return this.buildResponse(user);
    }

    private buildResponse (user: User): AuthResponseDto {
        return {
            accessToken: this.jwt.sign({ sub: user.id }),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        };
    }
}