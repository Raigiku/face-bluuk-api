import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DoesIdExistMainDb {
  constructor(private connection: Connection) {}

  async execute(id: string, tableName: string): Promise<boolean> {
    const rows: any[] = await this.connection.query(
      `select 1 from ${tableName} where id=?`,
      [id],
    );
    return rows.length > 0;
  }
}
