import { Global, Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';

@Global()
@Module({
  imports: [PersistenceModule],
  exports: [PersistenceModule],
})
export class InfrastructureModule {}
