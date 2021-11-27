import { EntitySchema } from 'typeorm';
import { User } from './user.schema';

export interface Post {
  id: string;
  text: string;
  likes: number;
  creationDate: Date;
  creator: User;
  userLikes: User[];
}

export const PostSchema = new EntitySchema<Post>({
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
