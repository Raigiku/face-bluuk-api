import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePostMainDb } from './typeorm/command/create-post.main-db';
import { RegisterUserMainDb } from './typeorm/command/register-user.main-db';
import { LikePostMainDb } from './typeorm/command/like-post.main-db';
import { DoesIdExistMainDb } from './typeorm/query/does-id-exist.main-db';
import { HasUserLikedPostMainDb } from './typeorm/query/has-user-likes-post.main-db';
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
    RegisterUserMainDb,
    CreatePostMainDb,
    LikePostMainDb,
    // queries
    IsUsernameUniqueMainDb,
    DoesIdExistMainDb,
    HasUserLikedPostMainDb,
  ],
  exports: [
    // commands
    RegisterUserMainDb,
    CreatePostMainDb,
    LikePostMainDb,
    // queries
    IsUsernameUniqueMainDb,
    DoesIdExistMainDb,
    HasUserLikedPostMainDb,
  ],
})
export class MainDbModule {}
