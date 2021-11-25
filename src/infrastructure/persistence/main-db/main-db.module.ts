import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserMainDb } from './typeorm/command/register-user.main-db';
import { IsUsernameUniqueMainDb } from './typeorm/query/is-username-unique.main-db';
import { UserSchema } from './typeorm/schemas/user.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'facebluuk.sqlite',
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
  ],
  providers: [RegisterUserMainDb, IsUsernameUniqueMainDb],
  exports: [RegisterUserMainDb, IsUsernameUniqueMainDb],
})
export class MainDbModule {}
