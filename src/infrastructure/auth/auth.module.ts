import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth-constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: authConstants.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtModule],
})
export class AuthModule {}
