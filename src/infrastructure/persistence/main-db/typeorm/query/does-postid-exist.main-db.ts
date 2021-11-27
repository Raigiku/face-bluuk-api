import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DoesPostIdExistMainDb {
  constructor(private connection: Connection) {}

  async execute(postId: string): Promise<boolean> {
    const rows: any[] = await this.connection.query(
      `select 1 from post where id=?`,
      [postId],
    );
    return rows.length > 0;
  }
}
