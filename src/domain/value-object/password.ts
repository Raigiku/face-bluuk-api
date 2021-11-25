export class Password {
  static minLength = 1;
  static maxLength = 20;

  static parse(val: string, errors: string[]): string | null {
    const isInsideLength =
      val.length > this.minLength && val.length <= this.maxLength;
    if (!isInsideLength)
      errors.push(
        `length has to be between ${this.minLength} and ${this.maxLength}`,
      );

    const isAlphaNumerical = /^[a-z0-9]+$/i.test(val);
    if (!isAlphaNumerical) errors.push('not alphanumerical');

    if (!isInsideLength || !isAlphaNumerical) return null;

    return val;
  }
}
