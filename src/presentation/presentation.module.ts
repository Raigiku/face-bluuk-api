import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostResolver } from './graphql/post/post.resolver';
import { UserResolver } from './graphql/user/user.resolver';
import * as jwtL from 'jsonwebtoken';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams: any) => {
            const jwtPayload = jwtL.decode(connectionParams.authorization);
            return {
              req: {
                user: jwtPayload,
                headers: connectionParams,
              },
            };
          },
        },
      },
    }),
  ],
  providers: [UserResolver, PostResolver],
})
export class PresentationModule {}
