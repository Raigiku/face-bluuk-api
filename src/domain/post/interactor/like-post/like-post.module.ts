import { Module } from '@nestjs/common';
import { LikePostInteractor } from './like-post.interactor';
import { LikePostInteractorInfra } from './like-post.interactor.infra';

@Module({
  providers: [LikePostInteractor, LikePostInteractorInfra],
  exports: [LikePostInteractor],
})
export class LikePostModule {}
