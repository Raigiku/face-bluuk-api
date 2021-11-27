import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { PostSchema } from '../schemas/post.schema';

@Injectable()
export class LikePostMainDb {
  constructor(private connection: Connection) {}

  async execute(
    manager: EntityManager,
    postId: string,
    userId: string,
    likesAmount: number,
  ): Promise<void> {
    await manager.increment(PostSchema, { id: postId }, 'likes', likesAmount);
    await manager.insert('user_posts_liked_post', { postId, userId });
  }

  async executeTransaction(
    postId: string,
    userId: string,
    likesAmount: number,
  ): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await this.execute(manager, postId, userId, likesAmount);
    });
  }
}
