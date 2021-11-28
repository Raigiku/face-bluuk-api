import { Module } from '@nestjs/common';
import { LoginUserInteractor } from './login-user.interactor';
import { LoginUserInteractorInfra } from './login-user.interactor.infra';

@Module({
  providers: [LoginUserInteractor, LoginUserInteractorInfra],
  exports: [LoginUserInteractor],
})
export class LoginUserModule {}
