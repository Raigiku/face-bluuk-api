import { UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePostInteractor } from 'src/domain/interactor/create-post/create-post.interactor';
import { CreatePostInteractorInput } from 'src/domain/interactor/create-post/create-post.interactor.input';
import { JwtPayload } from 'src/domain/value-object/jwt-payload';
import { CurrentUser } from 'src/infrastructure/auth/auth-constants';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@InputType()
export class CreatePostInput {
  @Field()
  text!: string;
}

@Resolver()
export class CreatePostResolver {
  constructor(private interactor: CreatePostInteractor) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async createPost(
    @Args('input') req: CreatePostInput,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<boolean> {
    const input = CreatePostInteractorInput.parse(jwtPayload.userId, req.text);
    await this.interactor.execute(input);
    return true;
  }
}
