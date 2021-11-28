import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/domain/core/value-object/jwt-payload';
import { Connection } from 'typeorm';

@Injectable()
export class LoginUserInteractorInfra {
  constructor(private connection: Connection, private jwtService: JwtService) {}

  async findUserInMainDb(
    username: string,
  ): Promise<{ id: string; hashedPassword: string } | null> {
    const rows: any[] = await this.connection.query(
      `select id, hashedPassword from user where username=?`,
      [username],
    );
    if (rows.length === 0) return null;
    return rows[0];
  }

  generateJsonWebToken(userId: string): string {
    const payload = new JwtPayload(userId);
    return this.jwtService.sign({ ...payload });
  }
}
