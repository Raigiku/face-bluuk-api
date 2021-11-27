import { Injectable } from '@nestjs/common';
import { InserPostMainDb } from 'src/infrastructure/persistence/main-db/typeorm/command/insert-post.main-db';
import { DoesUserIdExistMainDb } from 'src/infrastructure/persistence/main-db/typeorm/query/does-userid-exist.main-db';

@Injectable()
export class CreatePostInteractorInfra {
  constructor(
    private mainDbDoesUserIdExist: DoesUserIdExistMainDb,
    private mainDbInsertPost: InserPostMainDb,
  ) {}

  async isUserInMainDb(userId: string): Promise<boolean> {
    return await this.mainDbDoesUserIdExist.execute(userId);
  }

  async insertPostInMainDb(
    id: string,
    text: string,
    likes: number,
    userId: string,
  ): Promise<void> {
    await this.mainDbInsertPost.execute(id, text, likes, userId);
  }
}
