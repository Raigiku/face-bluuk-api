import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LoginUserResolver } from './graphql/resolvers/login-user.resolver';
import { RegisterUserResolver } from './graphql/resolvers/register-user.resolver';
import { RootQuery } from './graphql/resolvers/root-query.resolver';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [RootQuery, RegisterUserResolver, LoginUserResolver],
})
export class PresentationModule {}
