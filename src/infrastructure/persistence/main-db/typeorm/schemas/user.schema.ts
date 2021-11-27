import { EntitySchema } from 'typeorm';
import { PostTable } from './post.schema';

export interface UserTable {
  id: string;
  username: string;
  hashedPassword: string;
  createdPosts: PostTable[];
  postsLiked: PostTable[];
}

export const UserSchema = new EntitySchema<UserTable>({
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
