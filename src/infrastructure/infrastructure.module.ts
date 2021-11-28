import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from './auth/auth.module';
import { PersistenceModule } from './persistence/persistence.module';

@Global()
@Module({
  imports: [PersistenceModule, AuthModule],
  providers: [PubSub],
  exports: [PersistenceModule, AuthModule, PubSub],
})
export class InfrastructureModule {}
