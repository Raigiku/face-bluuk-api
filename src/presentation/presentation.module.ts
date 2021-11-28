import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostResolver } from './graphql/post/post.resolver';
import { UserResolver } from './graphql/user/user.resolver';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [UserResolver, PostResolver],
})
export class PresentationModule {}
