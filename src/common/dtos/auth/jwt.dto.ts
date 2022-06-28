export class JwtDto {
  constructor(jwt) {
    this.jwt = jwt;
  }
  public readonly jwt!: string;
}
