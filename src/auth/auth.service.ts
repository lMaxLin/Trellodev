import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService) {}

    async register(data: { email: string; password: string; name?: string }) {
        const exists = await User.query().findOne({ email: data.email });
        if (exists) throw new BadRequestException('Email already exists');
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await User.query().insert({
            email: data.email,
            password: hashed,
            name: data.name,
        });
        const token = this.jwt.sign({ sub: user.id });
        return { user: { id: user.id, email: user.email, name: user.name }, token };
    }

    async login(email: string, password: string) {
        const user = await User.query().findOne({ email });
        if (!user) throw new BadRequestException('Invalid credentials');
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new BadRequestException('Invalid credentials');
        const token = this.jwt.sign({ sub: user.id });
        return { user: { id: user.id, email: user.email, name: user.name }, token };
    }
}