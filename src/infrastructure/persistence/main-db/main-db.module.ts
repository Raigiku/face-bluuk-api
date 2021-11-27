import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InserPostMainDb } from './typeorm/command/insert-post.main-db';
import { InsertUserMainDb } from './typeorm/command/insert-user.main-db';
import { DoesUserIdExistMainDb } from './typeorm/query/does-userid-exist.main-db';
import { IsUsernameUniqueMainDb } from './typeorm/query/is-username-unique.main-db';
import { PostSchema } from './typeorm/schemas/post.schema';
import { UserSchema } from './typeorm/schemas/user.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema, PostSchema]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'facebluuk.sqlite',
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
  ],
  providers: [
    // commands
    InsertUserMainDb,
    InserPostMainDb,
    // queries
    IsUsernameUniqueMainDb,
    DoesUserIdExistMainDb,
  ],
  exports: [
    // commands
    InsertUserMainDb,
    InserPostMainDb,
    // queries
    IsUsernameUniqueMainDb,
    DoesUserIdExistMainDb,
  ],
})
export class MainDbModule {}
