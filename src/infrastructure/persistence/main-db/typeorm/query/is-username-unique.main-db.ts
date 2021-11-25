import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class IsUsernameUniqueMainDb {
  constructor(private connection: Connection) {}

  async execute(username: string): Promise<boolean> {
    const rows: any[] = await this.connection.query(
      `select 1 from user where username=?`,
      [username],
    );
    return rows.length === 0;
  }
}
