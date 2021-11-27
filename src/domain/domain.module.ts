import { Global, Module } from '@nestjs/common';
import { CreatePostModule } from './interactor/create-post/create-post.module';
import { LoginUserModule } from './interactor/login-user/login-user.module';
import { RegisterUserModule } from './interactor/register-user/register-user.module';

@Global()
@Module({
  imports: [RegisterUserModule, LoginUserModule, CreatePostModule],
  exports: [RegisterUserModule, LoginUserModule, CreatePostModule],
})
export class DomainModule {}
