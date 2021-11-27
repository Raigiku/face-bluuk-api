import { EntitySchema } from 'typeorm';
import { Post } from './post.schema';

export interface User {
  id: string;
  username: string;
  hashedPassword: string;
  createdPosts: Post[];
  postsLiked: Post[];
}

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  tableName: 'user',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    username: {
      type: String,
      length: 20,
      nullable: false,
      unique: true,
    },
    hashedPassword: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    createdPosts: {
      type: 'one-to-many',
      target: 'post',
      inverseSide: 'creator',
    },
    postsLiked: {
      type: 'many-to-many',
      target: 'post',
      inverseSide: 'userLikes',
      joinTable: true,
    },
  },
});
