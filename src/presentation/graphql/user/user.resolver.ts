import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUserInteractor } from 'src/domain/user/interactor/login-user/login-user.interactor';
import { LoginUserInteractorInput } from 'src/domain/user/interactor/login-user/login-user.interactor.input';
import { RegisterUserInteractor } from 'src/domain/user/interactor/register-user/register-user.interactor';
import { RegisterUserInteractorInput } from 'src/domain/user/interactor/register-user/register-user.interactor.input';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Resolver()
export class UserResolver {
  constructor(
    private loginUserInteractor: LoginUserInteractor,
    private registerUserInteractor: RegisterUserInteractor,
  ) {}

  @Query(() => String, { nullable: true })
  async loginUser(@Args('arg') arg: LoginUserDto): Promise<string> {
    const input = LoginUserInteractorInput.parse(arg.username, arg.password);
    const output = await this.loginUserInteractor.execute(input);
    return output.jsonWebToken;
  }

  @Mutation(() => Boolean, { nullable: true })
  async registerUser(@Args('arg') arg: RegisterUserDto): Promise<boolean> {
    const input = RegisterUserInteractorInput.parse(arg.username, arg.password);
    await this.registerUserInteractor.execute(input);
    return true;
  }
}
