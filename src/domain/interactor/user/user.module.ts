import { Module } from '@nestjs/common';
import { LoginUserModule } from './login-user/login-user.module';
import { RegisterUserModule } from './register-user/register-user.module';

@Module({
  imports: [RegisterUserModule, LoginUserModule],
  exports: [RegisterUserModule, LoginUserModule],
})
export class UserModule {}
