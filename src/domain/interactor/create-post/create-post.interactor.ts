import { BadRequestException, Injectable } from '@nestjs/common';
import { Uuid } from 'src/domain/value-object/uuid';
import { CreatePostInteractorErrors } from './create-post.interactor.errors';
import { CreatePostInteractorInfra } from './create-post.interactor.infra';
import { CreatePostInteractorInput } from './create-post.interactor.input';

@Injectable()
export class CreatePostInteractor {
  constructor(private infrastructure: CreatePostInteractorInfra) {}

  async execute(input: CreatePostInteractorInput): Promise<void> {
    const errors = new CreatePostInteractorErrors();

    const userExists = this.infrastructure.isUserInMainDb(input.userId);
    if (!userExists) errors.userId.push('user does not exist');

    if (errors.hasErrors) throw new BadRequestException(errors);

    await this.infrastructure.insertPostInMainDb(
      Uuid.new(),
      input.text,
      0,
      input.userId,
      new Date(),
    );
  }
}
