export class Title {
  private constructor(private readonly value: string) {}

  public static create(raw: string): Title {
    const trimmed = raw?.trim();
    if (!trimmed || trimmed.length < 3) {
      throw new Error('Le titre doit contenir au moins 3 caractères.');
    }
    return new Title(trimmed);
  }

  public toString() {
    return this.value;
  }
}