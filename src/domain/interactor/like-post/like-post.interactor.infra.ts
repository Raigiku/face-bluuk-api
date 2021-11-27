import { Injectable } from '@nestjs/common';
import { LikePostMainDb } from 'src/infrastructure/persistence/main-db/typeorm/command/like-post.main-db';
import { DoesPostIdExistMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/does-postid-exist.main-db';
import { DoesUserIdExistMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/does-userid-exist.main-db';
import { HasUserLikedPostMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/has-user-likes-post.main-db';

@Injectable()
export class LikePostInteractorInfra {
  constructor(
    private mainDbDoesUserIdExist: DoesUserIdExistMainDb,
    private mainDbDoesPostIdExist: DoesPostIdExistMainDb,
    private mainDbHasUserLikedPost: HasUserLikedPostMainDb,
    private mainDbLikePost: LikePostMainDb,
  ) {}

  async isUserInMainDb(userId: string): Promise<boolean> {
    return await this.mainDbDoesUserIdExist.execute(userId);
  }

  async isPostInMainDb(postId: string): Promise<boolean> {
    return await this.mainDbDoesPostIdExist.execute(postId);
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
