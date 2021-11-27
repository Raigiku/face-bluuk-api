import { Injectable } from '@nestjs/common';
import { RegisterUserMainDb } from 'src/infrastructure/persistence/main-db/typeorm/command/register-user.main-db';
import { IsUsernameUniqueMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/is-username-unique.main-db';

@Injectable()
export class RegisterUserInteractorInfra {
  constructor(
    private mainDbRegisterUser: RegisterUserMainDb,
    private mainDbIsUsernameUnique: IsUsernameUniqueMainDb,
  ) {}

  async isUsernameUniqueInMainDb(username: string): Promise<boolean> {
    return await this.mainDbIsUsernameUnique.execute(username);
  }

  async registerUserInMainDb(
    id: string,
    username: string,
    hashedPassword: string,
  ): Promise<void> {
    await this.mainDbRegisterUser.executeTransaction(
      id,
      username,
      hashedPassword,
    );
  }
}
