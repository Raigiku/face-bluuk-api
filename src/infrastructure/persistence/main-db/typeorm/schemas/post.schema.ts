import { EntitySchema } from 'typeorm';
import { User } from './user.schema';

export interface Post {
  id: string;
  text: string;
  user: User;
}

export const PostSchema = new EntitySchema<Post>({
  name: 'Post',
  tableName: 'post',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    text: {
      type: String,
      length: 500,
      nullable: false,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
    },
  },
});
