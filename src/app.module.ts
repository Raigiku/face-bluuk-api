import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [PresentationModule, DomainModule, InfrastructureModule],
})
export class AppModule {}
