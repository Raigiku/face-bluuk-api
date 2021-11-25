import { EntitySchema } from 'typeorm';

class User {
  id!: string;
  username!: string;
  hashedPassword!: string;
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
});
