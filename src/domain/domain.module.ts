import { Global, Module } from '@nestjs/common';
import { UserModule } from './interactor/user/user.module';
import { PostModule } from './interactor/post/post.module';

@Global()
@Module({
  imports: [UserModule, PostModule],
  exports: [UserModule, PostModule],
})
export class DomainModule {}
