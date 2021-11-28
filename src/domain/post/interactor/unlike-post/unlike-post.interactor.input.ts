import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/domain/core/value-object/uuid';
import { UnlikePostInteractorErrors } from './unlike-post.interactor.errors';

export class UnlikePostInteractorInput {
  private constructor(readonly userId: string, readonly postId: string) {}

  static parse(userId: string, postId: string): UnlikePostInteractorInput {
    const errors = new UnlikePostInteractorErrors();

    const parsedUserId = Uuid.parse(userId, errors.userId);
    const parsedPostId = Uuid.parse(postId, errors.postId);

    if (parsedUserId === null || parsedPostId === null)
      throw new BadRequestException(errors);

    return new UnlikePostInteractorInput(parsedUserId, parsedPostId);
  }
}
