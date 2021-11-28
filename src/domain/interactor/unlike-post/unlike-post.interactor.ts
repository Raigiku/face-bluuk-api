import { BadRequestException, Injectable } from '@nestjs/common';
import { UnlikePostInteractorErrors } from './unlike-post.interactor.errors';
import { UnlikePostInteractorInfra } from './unlike-post.interactor.infra';
import { UnlikePostInteractorInput } from './unlike-post.interactor.input';

@Injectable()
export class UnlikePostInteractor {
  constructor(private infrastructure: UnlikePostInteractorInfra) {}

  async execute(input: UnlikePostInteractorInput): Promise<void> {
    const errors = new UnlikePostInteractorErrors();

    const userExists = await this.infrastructure.isUserInMainDb(input.userId);
    if (!userExists) errors.userId.push('does not exist');

    const postExists = await this.infrastructure.isPostInMainDb(input.postId);
    if (!postExists) errors.postId.push('does not exist');

    if (!userExists || !postExists) throw new BadRequestException(errors);

    const userHaslikedPost = await this.infrastructure.hasUserLikedPost(
      input.userId,
      input.postId,
    );
    if (!userHaslikedPost) {
      errors.other.push('user has not liked the post');
      throw new BadRequestException(errors);
    }

    await this.infrastructure.unlikePostInMainDb(input.userId, input.postId, 1);
  }
}
