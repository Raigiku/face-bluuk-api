import { UseGuards, Request } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreatePostInteractor } from 'src/domain/post/interactor/create-post/create-post.interactor';
import { CreatePostInteractorInput } from 'src/domain/post/interactor/create-post/create-post.interactor.input';
import { LikePostInteractor } from 'src/domain/post/interactor/like-post/like-post.interactor';
import { LikePostInteractorInput } from 'src/domain/post/interactor/like-post/like-post.interactor.input';
import { UnlikePostInteractor } from 'src/domain/post/interactor/unlike-post/unlike-post.interactor';
import { UnlikePostInteractorInput } from 'src/domain/post/interactor/unlike-post/unlike-post.interactor.input';
import { JwtPayload } from 'src/domain/core/value-object/jwt-payload';
import { CurrentUser } from 'src/infrastructure/auth/auth-constants';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreatePostArgDto } from './dto/arg/create-post.arg.dto';
import { UnlikePostArgDto } from './dto/arg/unlike-post.arg.dto';
import { PostLikedResponseDto } from './dto/response/post-liked.response.dto';
import { PostLiked } from 'src/domain/post/event/post-liked';
import { PostLikedArgDto } from './dto/arg/post-liked.arg.dto';
import { LikePostArgDto } from './dto/arg/like-post.arg.dto';

@Resolver()
export class PostResolver {
  constructor(
    private createPostInteractor: CreatePostInteractor,
    private unlikePostInteractor: UnlikePostInteractor,
    private likePostInteractor: LikePostInteractor,
    private pubSub: PubSub,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async createPost(
    @Args('arg') arg: CreatePostArgDto,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = CreatePostInteractorInput.parse(jwtPayload.userId, arg.text);
    await this.createPostInteractor.execute(input);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async unlikePost(
    @Args('arg') arg: UnlikePostArgDto,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = UnlikePostInteractorInput.parse(
      jwtPayload.userId,
      arg.postId,
    );
    await this.unlikePostInteractor.execute(input);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async likePost(
    @Args('arg') arg: LikePostArgDto,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = LikePostInteractorInput.parse(jwtPayload.userId, arg.postId);
    await this.likePostInteractor.execute(input);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Subscription(() => PostLikedResponseDto, {
    nullable: true,
    filter: (payload: PostLiked, variables: { arg: PostLikedArgDto }) =>
      variables.arg.postsId.includes(payload.postLiked.postId),
  })
  postLiked(
    @Args('arg') arg: PostLikedArgDto,
  ): AsyncIterator<PostLikedResponseDto> | null {
    return this.pubSub.asyncIterator(PostLiked.eventName);
  }
}
