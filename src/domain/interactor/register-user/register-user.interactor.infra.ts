import { Injectable } from '@nestjs/common';
import { InsertUserMainDb } from 'src/infrastructure/persistence/main-db/typeorm/command/insert-user.main-db';
import { IsUsernameUniqueMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/is-username-unique.main-db';

@Injectable()
export class RegisterUserInteractorInfra {
  constructor(
    private mainDbRegisterUser: InsertUserMainDb,
    private mainDbIsUsernameUnique: IsUsernameUniqueMainDb,
  ) {}

  async isUsernameUniqueInMainDb(username: string): Promise<boolean> {
    return await this.mainDbIsUsernameUnique.execute(username);
  }

  async insertUserInMainDb(
    id: string,
    username: string,
    hashedPassword: string,
  ): Promise<void> {
    await this.mainDbRegisterUser.execute(id, username, hashedPassword);
  }
}
