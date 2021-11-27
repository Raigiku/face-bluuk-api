import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { PostSchema } from '../schemas/post.schema';

@Injectable()
export class CreatePostMainDb {
  constructor(private connection: Connection) {}

  async execute(
    manager: EntityManager,
    id: string,
    text: string,
    likes: number,
    userId: string,
    creationDate: Date,
  ): Promise<void> {
    await manager.insert(PostSchema, {
      id,
      text,
      likes,
      creationDate: creationDate,
      creator: { id: userId },
    });
  }

  async executeTransaction(
    id: string,
    text: string,
    likes: number,
    userId: string,
    creationDate: Date,
  ): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await this.execute(manager, id, text, likes, userId, creationDate);
    });
  }
}
