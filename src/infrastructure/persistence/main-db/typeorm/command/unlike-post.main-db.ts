import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { PostSchema } from '../schemas/post.schema';

@Injectable()
export class UnlikePostMainDb {
  constructor(private connection: Connection) {}

  async execute(
    manager: EntityManager,
    postId: string,
    userId: string,
    unlikeAmount: number,
  ): Promise<void> {
    await manager.decrement(PostSchema, { id: postId }, 'likes', unlikeAmount);
    await manager.delete('user_posts_liked_post', { postId, userId });
  }

  async executeTransaction(
    postId: string,
    userId: string,
    unlikeAmount: number,
  ): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await this.execute(manager, postId, userId, unlikeAmount);
    });
  }
}
