export class PostText {
  static minLength = 10;
  static maxLength = 500;

  static parse(val: string, errors: string[]): string | null {
    if (!(val.length >= this.minLength && val.length <= this.maxLength)) {
      errors.push(
        `length has to be between ${this.minLength} and ${this.maxLength}`,
      );
      return null;
    }

    return val;
  }
}
