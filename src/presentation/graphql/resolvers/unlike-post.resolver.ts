import { UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { UnlikePostInteractor } from 'src/domain/interactor/unlike-post/unlike-post.interactor';
import { UnlikePostInteractorInput } from 'src/domain/interactor/unlike-post/unlike-post.interactor.input';
import { JwtPayload } from 'src/domain/value-object/jwt-payload';
import { CurrentUser } from 'src/infrastructure/auth/auth-constants';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@InputType()
export class UnlikePostInput {
  @Field()
  postId!: string;
}

@Resolver()
export class UnlikePostResolver {
  constructor(private interactor: UnlikePostInteractor) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async unlikePost(
    @Args('input') req: UnlikePostInput,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = UnlikePostInteractorInput.parse(
      jwtPayload.userId,
      req.postId,
    );
    await this.interactor.execute(input);
    return true;
  }
}
