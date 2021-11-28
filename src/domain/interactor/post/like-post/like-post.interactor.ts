import { BadRequestException, Injectable } from '@nestjs/common';
import { LikePostInteractorErrors } from './like-post.interactor.errors';
import { LikePostInteractorInfra } from './like-post.interactor.infra';
import { LikePostInteractorInput } from './like-post.interactor.input';

@Injectable()
export class LikePostInteractor {
  constructor(private infrastructure: LikePostInteractorInfra) {}

  async execute(input: LikePostInteractorInput): Promise<void> {
    const errors = new LikePostInteractorErrors();

    const userExists = await this.infrastructure.isUserInMainDb(input.userId);
    if (!userExists) errors.userId.push('does not exist');

    const postExists = await this.infrastructure.isPostInMainDb(input.postId);
    if (!postExists) errors.postId.push('does not exist');

    if (!userExists || !postExists) throw new BadRequestException(errors);

    const userHaslikedPost = await this.infrastructure.hasUserLikedPost(
      input.userId,
      input.postId,
    );
    if (userHaslikedPost) {
      errors.other.push('user has already liked the post');
      throw new BadRequestException(errors);
    }

    await this.infrastructure.likePostInMainDb(input.userId, input.postId, 1);
  }
}
