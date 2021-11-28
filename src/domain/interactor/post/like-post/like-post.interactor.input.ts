import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/domain/value-object/uuid';
import { LikePostInteractorErrors } from './like-post.interactor.errors';

export class LikePostInteractorInput {
  private constructor(readonly userId: string, readonly postId: string) {}

  static parse(userId: string, postId: string): LikePostInteractorInput {
    const errors = new LikePostInteractorErrors();

    const parsedUserId = Uuid.parse(userId, errors.userId);
    const parsedPostId = Uuid.parse(postId, errors.postId);

    if (parsedUserId === null || parsedPostId === null)
      throw new BadRequestException(errors);

    return new LikePostInteractorInput(parsedUserId, parsedPostId);
  }
}
