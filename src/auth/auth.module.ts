import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject:[ ConfigService ],
            useFactory: ( config: ConfigService ) => {
                const secret = config.get<string> ('JWT_SECRET')
            if (!secret) {
                throw new Error( 'Jwt is not defined' );
            }
            return {
            secret,
            signOptions: {
                expiresIn: config.get<string>('JWT_EXPIRES_IN', '3600s'),
            },
            };
            },
        }),
    ],
    providers: [ AuthService, JwtStrategy ],
    controllers: [ AuthController ],
    exports: [ AuthService ],
})

export class AuthModule {}