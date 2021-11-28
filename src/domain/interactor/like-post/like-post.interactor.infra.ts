import { Injectable } from '@nestjs/common';
import { LikePostMainDb } from 'src/infrastructure/persistence/main-db/typeorm/command/like-post.main-db';
import { DoesIdExistMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/does-id-exist.main-db';
import { HasUserLikedPostMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/has-user-likes-post.main-db';

@Injectable()
export class LikePostInteractorInfra {
  constructor(
    private mainDbDoesIdExist: DoesIdExistMainDb,
    private mainDbHasUserLikedPost: HasUserLikedPostMainDb,
    private mainDbLikePost: LikePostMainDb,
  ) {}

  async isUserInMainDb(userId: string): Promise<boolean> {
    return await this.mainDbDoesIdExist.execute(userId, 'user');
  }

  async isPostInMainDb(postId: string): Promise<boolean> {
    return await this.mainDbDoesIdExist.execute(postId, 'post');
  }

  async hasUserLikedPost(userId: string, postId: string): Promise<boolean> {
    return await this.mainDbHasUserLikedPost.execute(userId, postId);
  }

  async likePostInMainDb(
    userId: string,
    postId: string,
    likesAmount: number,
  ): Promise<void> {
    await this.mainDbLikePost.executeTransaction(postId, userId, likesAmount);
  }
}
