import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Global()
@Module({
  imports: [UserModule, PostModule],
  exports: [UserModule, PostModule],
})
export class DomainModule {}
