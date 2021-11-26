import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterUserInteractor } from 'src/domain/interactor/register-user/register-user.interactor';
import { RegisterUserInteractorInput } from 'src/domain/interactor/register-user/register-user.interactor.input';

@InputType()
export class RegisterUserInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@Resolver()
export class RegisterUserResolver {
  constructor(private interactor: RegisterUserInteractor) {}

  @Mutation(() => Boolean, { nullable: true })
  async registerUser(@Args('input') req: RegisterUserInput): Promise<boolean> {
    const input = RegisterUserInteractorInput.parse(req.username, req.password);
    await this.interactor.execute(input);
    return true;
  }
}
