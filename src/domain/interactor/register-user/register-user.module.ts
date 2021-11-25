import { Module } from '@nestjs/common';
import { RegisterUserInteractor } from './register-user.interactor';
import { RegisterUserInteractorInfra } from './register-user.interactor.infra';

@Module({
  providers: [RegisterUserInteractor, RegisterUserInteractorInfra],
  exports: [RegisterUserInteractor],
})
export class RegisterUserModule {}
