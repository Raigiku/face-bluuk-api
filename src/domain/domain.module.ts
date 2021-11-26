import { Global, Module } from '@nestjs/common';
import { LoginUserModule } from './interactor/login-user/login-user.module';
import { RegisterUserModule } from './interactor/register-user/register-user.module';

@Global()
@Module({
  imports: [RegisterUserModule, LoginUserModule],
  exports: [RegisterUserModule, LoginUserModule],
})
export class DomainModule {}
