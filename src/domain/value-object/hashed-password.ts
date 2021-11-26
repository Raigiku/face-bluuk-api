import * as bcrypt from 'bcrypt';

export class HashedPassword {
  static saltRounds = 10;

  static new(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
