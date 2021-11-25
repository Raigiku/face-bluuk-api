import { Module } from '@nestjs/common';
import { MainDbModule } from './main-db/main-db.module';

@Module({
  imports: [MainDbModule],
  exports: [MainDbModule],
})
export class PersistenceModule {}
