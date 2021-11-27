import { Injectable } from '@nestjs/common';
import { Connection, EntityManager, InsertResult } from 'typeorm';
import { PostSchema } from '../schemas/post.schema';

@Injectable()
export class InserPostMainDb {
  constructor(private connection: Connection) {}

  insertIntoPost(
    manager: EntityManager,
    id: string,
    text: string,
    likes: number,
    userId: string,
    creationDate: Date,
  ): Promise<InsertResult> {
    return manager.insert(PostSchema, {
      id,
      text,
      likes,
      creationDate: creationDate,
      creator: { id: userId },
    });
  }

  async execute(
    id: string,
    text: string,
    likes: number,
    userId: string,
    creationDate: Date,
  ): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await this.insertIntoPost(manager, id, text, likes, userId, creationDate);
    });
  }
}
