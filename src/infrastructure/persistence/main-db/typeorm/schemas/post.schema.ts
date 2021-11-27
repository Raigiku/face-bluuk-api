import { EntitySchema } from 'typeorm';
import { UserTable } from './user.schema';

export interface PostTable {
  id: string;
  text: string;
  likes: number;
  creationDate: Date;
  creator: UserTable;
  userLikes: UserTable[];
}

export const PostSchema = new EntitySchema<PostTable>({
  name: 'post',
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
    likes: {
      type: 'bigint',
      nullable: false,
    },
    creationDate: {
      type: 'datetime',
      nullable: true,
    },
  },
  relations: {
    creator: {
      type: 'many-to-one',
      target: 'user',
      inverseSide: 'createdPosts',
    },
    userLikes: {
      type: 'many-to-many',
      target: 'user',
      inverseSide: 'postsLiked',
    },
  },
});
