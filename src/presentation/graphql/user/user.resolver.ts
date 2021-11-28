import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUserInteractor } from 'src/domain/interactor/user/login-user/login-user.interactor';
import { LoginUserInteractorInput } from 'src/domain/interactor/user/login-user/login-user.interactor.input';
import { RegisterUserInteractor } from 'src/domain/interactor/user/register-user/register-user.interactor';
import { RegisterUserInteractorInput } from 'src/domain/interactor/user/register-user/register-user.interactor.input';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Resolver()
export class UserResolver {
  constructor(
    private loginUserInteractor: LoginUserInteractor,
    private registerUserInteractor: RegisterUserInteractor,
  ) {}

  @Query(() => String, { nullable: true })
  async loginUser(@Args('req') req: LoginUserDto): Promise<string> {
    const input = LoginUserInteractorInput.parse(req.username, req.password);
    const output = await this.loginUserInteractor.execute(input);
    return output.jsonWebToken;
  }

  @Mutation(() => Boolean, { nullable: true })
  async registerUser(@Args('req') req: RegisterUserDto): Promise<boolean> {
    const input = RegisterUserInteractorInput.parse(req.username, req.password);
    await this.registerUserInteractor.execute(input);
    return true;
  }
}
