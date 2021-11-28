import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostResolver } from './graphql/post/post.resolver';
import { UserResolver } from './graphql/user/user.resolver';
import * as jwtP from 'jsonwebtoken';
import { authConstants } from 'src/infrastructure/auth/auth-constants';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams: any) => {
            const jwt = connectionParams.Authorization.split(' ')[1];
            const jwtPayload = jwtP.verify(jwt, authConstants.jwtSecret);
            return { user: jwtPayload };
          },
        },
      },
      context: ({ connection }) => {
        if (connection?.context != null) console.dir(connection.context);
      },
    }),
  ],
  providers: [UserResolver, PostResolver],
})
export class PresentationModule {}
