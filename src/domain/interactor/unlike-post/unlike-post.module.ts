import { Module } from '@nestjs/common';
import { UnlikePostInteractor } from './unlike-post.interactor';
import { UnlikePostInteractorInfra } from './unlike-post.interactor.infra';

@Module({
  providers: [UnlikePostInteractor, UnlikePostInteractorInfra],
  exports: [UnlikePostInteractor],
})
export class UnlikePostModule {}
