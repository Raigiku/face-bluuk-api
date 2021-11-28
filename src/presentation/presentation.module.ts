import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CreatePostResolver } from './graphql/resolvers/create-post.resolver';
import { LikePostResolver } from './graphql/resolvers/like-post.resolver';
import { LoginUserResolver } from './graphql/resolvers/login-user.resolver';
import { RegisterUserResolver } from './graphql/resolvers/register-user.resolver';
import { RootQuery } from './graphql/resolvers/root-query.resolver';
import { UnlikePostResolver } from './graphql/resolvers/unlike-post.resolver';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [
    RootQuery,
    RegisterUserResolver,
    LoginUserResolver,
    CreatePostResolver,
    LikePostResolver,
    UnlikePostResolver,
  ],
})
export class PresentationModule {}
