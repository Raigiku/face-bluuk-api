import * as uuid from 'uuid';

export class Uuid {
  static new(): string {
    return uuid.v4();
  }
}
