import * as uuid from 'uuid';

export class Uuid {
  static new(): string {
    return uuid.v4();
  }

  static parse(val: string, errors: string[]): string | null {
    if (!uuid.validate(val)) {
      errors.push('not an uuid');
      return null;
    }

    return val;
  }
}
