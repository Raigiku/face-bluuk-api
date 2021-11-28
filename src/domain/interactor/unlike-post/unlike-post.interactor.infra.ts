import { Injectable } from '@nestjs/common';
import { UnlikePostMainDb } from 'src/infrastructure/persistence/main-db/typeorm/command/unlike-post.main-db';
import { DoesIdExistMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/does-id-exist.main-db';
import { HasUserLikedPostMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/has-user-likes-post.main-db';

@Injectable()
export class UnlikePostInteractorInfra {
  constructor(
    private mainDbDoesIdExist: DoesIdExistMainDb,
    private mainDbHasUserLikedPost: HasUserLikedPostMainDb,
    private mainDbUnlikePost: UnlikePostMainDb,
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

  async unlikePostInMainDb(
    userId: string,
    postId: string,
    unlikeAmount: number,
  ): Promise<void> {
    await this.mainDbUnlikePost.executeTransaction(
      postId,
      userId,
      unlikeAmount,
    );
  }
}
