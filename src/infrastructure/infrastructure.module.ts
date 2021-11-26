import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PersistenceModule } from './persistence/persistence.module';

@Global()
@Module({
  imports: [PersistenceModule, AuthModule],
  exports: [PersistenceModule, AuthModule],
})
export class InfrastructureModule {}
