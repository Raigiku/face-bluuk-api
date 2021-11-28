import { Module } from '@nestjs/common';
import { CreatePostInteractor } from './create-post.interactor';
import { CreatePostInteractorInfra } from './create-post.interactor.infra';

@Module({
  providers: [CreatePostInteractor, CreatePostInteractorInfra],
  exports: [CreatePostInteractor],
})
export class CreatePostModule {}
