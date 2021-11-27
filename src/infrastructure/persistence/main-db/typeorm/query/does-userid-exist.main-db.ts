import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DoesUserIdExistMainDb {
  constructor(private connection: Connection) {}

  async execute(userId: string): Promise<boolean> {
    const rows: any[] = await this.connection.query(
      `select 1 from user where id=?`,
      [userId],
    );
    return rows.length > 0;
  }
}
