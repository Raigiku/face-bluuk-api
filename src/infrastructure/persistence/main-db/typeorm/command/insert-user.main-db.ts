import { Injectable } from '@nestjs/common';
import { Connection, EntityManager, InsertResult } from 'typeorm';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export class InsertUserMainDb {
  constructor(private connection: Connection) {}

  insertIntoUser(
    manager: EntityManager,
    id: string,
    username: string,
    hashedPassword: string,
  ): Promise<InsertResult> {
    return manager.insert(UserSchema, {
      id,
      username,
      hashedPassword,
    });
  }

  async execute(
    id: string,
    username: string,
    hashedPassword: string,
  ): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await this.insertIntoUser(manager, id, username, hashedPassword);
    });
  }
}
