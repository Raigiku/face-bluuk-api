import { Injectable } from '@nestjs/common';
import { CreatePostMainDb } from 'src/infrastructure/persistence/main-db/typeorm/command/create-post.main-db';
import { DoesIdExistMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/does-id-exist.main-db';

@Injectable()
export class CreatePostInteractorInfra {
  constructor(
    private mainDbDoesUserIdExist: DoesIdExistMainDb,
    private mainDbInsertPost: CreatePostMainDb,
  ) {}

  async isUserInMainDb(userId: string): Promise<boolean> {
    return await this.mainDbDoesUserIdExist.execute(userId, 'user');
  }

  async createPostInMainDb(
    id: string,
    text: string,
    likes: number,
    userId: string,
    creationDate: Date,
  ): Promise<void> {
    await this.mainDbInsertPost.executeTransaction(
      id,
      text,
      likes,
      userId,
      creationDate,
    );
  }
}
