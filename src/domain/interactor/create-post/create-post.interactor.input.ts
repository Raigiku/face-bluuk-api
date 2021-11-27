import { BadRequestException } from '@nestjs/common';
import { PostText } from 'src/domain/value-object/post-text';
import { Uuid } from 'src/domain/value-object/uuid';
import { CreatePostInteractorErrors } from './create-post.interactor.errors';

export class CreatePostInteractorInput {
  private constructor(readonly userId: string, readonly text: string) {}

  static parse(userId: string, text: string): CreatePostInteractorInput {
    const errors = new CreatePostInteractorErrors();

    const parsedUserId = Uuid.parse(userId, errors.userId);
    const parsedText = PostText.parse(text, errors.text);

    if (parsedUserId === null || parsedText === null)
      throw new BadRequestException(errors);

    return new CreatePostInteractorInput(parsedUserId, parsedText);
  }
}
