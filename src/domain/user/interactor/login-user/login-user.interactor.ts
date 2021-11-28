import { BadRequestException, Injectable } from '@nestjs/common';
import { HashedPassword } from 'src/domain/user/value-object/hashed-password';
import { LoginUserInteractorErrors } from './login-user.interactor.errors';
import { LoginUserInteractorInfra } from './login-user.interactor.infra';
import { LoginUserInteractorInput } from './login-user.interactor.input';
import { LoginUserInteractorOutput } from './login-user.interactor.output';

@Injectable()
export class LoginUserInteractor {
  constructor(private infrastructure: LoginUserInteractorInfra) {}

  async execute(
    input: LoginUserInteractorInput,
  ): Promise<LoginUserInteractorOutput> {
    const errors = new LoginUserInteractorErrors();

    const foundUser = await this.infrastructure.findUserInMainDb(
      input.username,
    );
    if (foundUser === null) {
      errors.username.push('not found');
      throw new BadRequestException(errors);
    }

    const passwordsMatch = HashedPassword.compare(
      input.password,
      foundUser.hashedPassword,
    );
    if (!passwordsMatch) {
      errors.password.push('does not match with stored password');
      throw new BadRequestException(errors);
    }

    const jsonWebToken = this.infrastructure.generateJsonWebToken(foundUser.id);
    return new LoginUserInteractorOutput(jsonWebToken);
  }
}
