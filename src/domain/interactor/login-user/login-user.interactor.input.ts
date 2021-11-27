import { BadRequestException } from '@nestjs/common';
import { Password } from 'src/domain/value-object/password';
import { Username } from 'src/domain/value-object/username';
import { LoginUserInteractorErrors } from './login-user.interactor.errors';

export class LoginUserInteractorInput {
  private constructor(readonly username: string, readonly password: string) {}

  static parse(username: string, password: string): LoginUserInteractorInput {
    const errors = new LoginUserInteractorErrors();

    const parsedUsername = Username.parse(username, errors.username);
    const parsedPassword = Password.parse(password, errors.password);

    if (parsedUsername === null || parsedPassword === null)
      throw new BadRequestException(errors);

    return new LoginUserInteractorInput(parsedUsername, parsedPassword);
  }
}
