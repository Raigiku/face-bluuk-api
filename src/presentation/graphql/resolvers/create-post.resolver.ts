import { UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
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
  //   constructor(private interactor: LoginUserInteractor) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String, { nullable: true })
  async createPost(
    @Args('input') req: CreatePostInput,
    @CurrentUser() jwtPayload: JwtPayload,
  ): Promise<string> {
    return 'yeah!';
    // const input = LoginUserInteractorInput.parse(req.username, req.password);
    // const output = await this.interactor.execute(input);
    // return output.jsonWebToken;
  }
}
