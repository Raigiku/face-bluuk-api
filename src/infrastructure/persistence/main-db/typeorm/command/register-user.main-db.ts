import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export class RegisterUserMainDb {
  constructor(private connection: Connection) {}

  async execute(
    manager: EntityManager,
    id: string,
    username: string,
    hashedPassword: string,
  ): Promise<void> {
    await manager.insert(UserSchema, {
      id,
      username,
      hashedPassword,
    });
  }

  async executeTransaction(
    id: string,
    username: string,
    hashedPassword: string,
  ): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await this.execute(manager, id, username, hashedPassword);
    });
  }
}
