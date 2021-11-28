import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePostInteractor } from 'src/domain/interactor/create-post/create-post.interactor';
import { CreatePostInteractorInput } from 'src/domain/interactor/create-post/create-post.interactor.input';
import { LikePostInteractor } from 'src/domain/interactor/like-post/like-post.interactor';
import { LikePostInteractorInput } from 'src/domain/interactor/like-post/like-post.interactor.input';
import { UnlikePostInteractor } from 'src/domain/interactor/unlike-post/unlike-post.interactor';
import { UnlikePostInteractorInput } from 'src/domain/interactor/unlike-post/unlike-post.interactor.input';
import { JwtPayload } from 'src/domain/value-object/jwt-payload';
import { CurrentUser } from 'src/infrastructure/auth/auth-constants';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { UnlikePostDto } from './dto/unlike-post.dto';

@Resolver()
export class PostResolver {
  constructor(
    private createPostInteractor: CreatePostInteractor,
    private unlikePostInteractor: UnlikePostInteractor,
    private likePostInteractor: LikePostInteractor,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async createPost(
    @Args('req') req: CreatePostDto,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = CreatePostInteractorInput.parse(jwtPayload.userId, req.text);
    await this.createPostInteractor.execute(input);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async unlikePost(
    @Args('req') req: UnlikePostDto,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = UnlikePostInteractorInput.parse(
      jwtPayload.userId,
      req.postId,
    );
    await this.unlikePostInteractor.execute(input);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async likePost(
    @Args('req') req: LikePostDto,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = LikePostInteractorInput.parse(jwtPayload.userId, req.postId);
    await this.likePostInteractor.execute(input);
    return true;
  }
}
