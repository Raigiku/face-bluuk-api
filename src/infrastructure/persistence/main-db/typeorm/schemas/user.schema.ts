import { EntitySchema } from 'typeorm';
import { Post } from './post.schema';

export interface User {
  id: string;
  username: string;
  hashedPassword: string;
  posts: Post[];
}

export const UserSchema = new EntitySchema<User>({
  name: 'User',
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
    posts: {
      type: 'one-to-many',
      target: 'Post',
    },
  },
});
