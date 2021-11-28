import { Module } from '@nestjs/common';
import { CreatePostModule } from './create-post/create-post.module';
import { LikePostModule } from './like-post/like-post.module';
import { UnlikePostModule } from './unlike-post/unlike-post.module';

@Module({
  imports: [CreatePostModule, LikePostModule, UnlikePostModule],
  exports: [CreatePostModule, LikePostModule, UnlikePostModule],
})
export class PostModule {}
