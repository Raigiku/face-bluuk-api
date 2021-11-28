import { BadRequestException } from '@nestjs/common';
import { Password } from 'src/domain/user/value-object/password';
import { Username } from 'src/domain/user/value-object/username';
import { RegisterUserInteractorErrors } from './register-user.interactor.errors';

export class RegisterUserInteractorInput {
  private constructor(readonly username: string, readonly password: string) {}

  static parse(
    username: string,
    password: string,
  ): RegisterUserInteractorInput {
    const errors = new RegisterUserInteractorErrors();

    const parsedUsername = Username.parse(username, errors.username);
    const parsedPassword = Password.parse(password, errors.password);

    if (parsedPassword === null || parsedUsername === null)
      throw new BadRequestException(errors);

    return new RegisterUserInteractorInput(parsedUsername, parsedPassword);
  }
}
