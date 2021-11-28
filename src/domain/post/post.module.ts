import { Module } from '@nestjs/common';
import { CreatePostModule } from './interactor/create-post/create-post.module';
import { LikePostModule } from './interactor/like-post/like-post.module';
import { UnlikePostModule } from './interactor/unlike-post/unlike-post.module';

@Module({
  imports: [CreatePostModule, LikePostModule, UnlikePostModule],
  exports: [CreatePostModule, LikePostModule, UnlikePostModule],
})
export class PostModule {}
