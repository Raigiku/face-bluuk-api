import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { LoginUserInteractor } from 'src/domain/interactor/login-user/login-user.interactor';
import { LoginUserInteractorInput } from 'src/domain/interactor/login-user/login-user.interactor.input';

@InputType()
export class LoginUserInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@Resolver()
export class LoginUserResolver {
  constructor(private interactor: LoginUserInteractor) {}

  @Query(() => String, { nullable: true })
  async loginUser(@Args('input') req: LoginUserInput): Promise<string> {
    const input = LoginUserInteractorInput.parse(req.username, req.password);
    const output = await this.interactor.execute(input);
    return output.jsonWebToken;
  }
}
