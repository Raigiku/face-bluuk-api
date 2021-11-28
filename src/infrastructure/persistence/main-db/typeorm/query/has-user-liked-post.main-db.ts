import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class HasUserLikedPostMainDb {
  constructor(private connection: Connection) {}

  async execute(userId: string, postId: string): Promise<boolean> {
    const rows: any[] = await this.connection.query(
      `select 1 from user_posts_liked_post where userId=? and postId=?`,
      [userId, postId],
    );
    return rows.length > 0;
  }
}
