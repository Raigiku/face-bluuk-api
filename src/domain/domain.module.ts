import { Global, Module } from '@nestjs/common';
import { RegisterUserModule } from './interactor/register-user/register-user.module';

@Global()
@Module({
  imports: [RegisterUserModule],
  exports: [RegisterUserModule],
})
export class DomainModule {}
