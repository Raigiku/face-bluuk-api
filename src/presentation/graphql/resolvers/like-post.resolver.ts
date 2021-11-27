import { UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { LikePostInteractor } from 'src/domain/interactor/like-post/like-post.interactor';
import { LikePostInteractorInput } from 'src/domain/interactor/like-post/like-post.interactor.input';
import { JwtPayload } from 'src/domain/value-object/jwt-payload';
import { CurrentUser } from 'src/infrastructure/auth/auth-constants';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@InputType()
export class LikePostInput {
  @Field()
  postId!: string;
}

@Resolver()
export class LikePostResolver {
  constructor(private interactor: LikePostInteractor) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async likePost(
    @Args('input') req: LikePostInput,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = LikePostInteractorInput.parse(jwtPayload.userId, req.postId);
    await this.interactor.execute(input);
    return true;
  }
}
