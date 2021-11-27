import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserInteractorErrors } from './register-user.interactor.errors';
import { RegisterUserInteractorInfra } from './register-user.interactor.infra';
import { RegisterUserInteractorInput } from './register-user.interactor.input';
import { HashedPassword } from 'src/domain/value-object/hashed-password';
import { Uuid } from 'src/domain/value-object/uuid';

@Injectable()
export class RegisterUserInteractor {
  constructor(private infrastructure: RegisterUserInteractorInfra) {}

  async execute(input: RegisterUserInteractorInput): Promise<void> {
    const errors = new RegisterUserInteractorErrors();

    const isUsernameUnique = await this.infrastructure.isUsernameUniqueInMainDb(
      input.username,
    );
    if (!isUsernameUnique) errors.username.push('username already exists');

    if (errors.hasErrors) throw new BadRequestException(errors);

    await this.infrastructure.insertUserInMainDb(
      Uuid.new(),
      input.username,
      HashedPassword.new(input.password),
    );
  }
}
