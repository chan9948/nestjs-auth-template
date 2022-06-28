import { IdType } from 'src/common/types/common.type';

export class PayloadDto {
  constructor(id: IdType, username: string, name: string) {
    this.id = id;
    this.username = username;
    this.name = name;
  }
  public readonly id: IdType;
  public readonly username: string;
  public readonly name: string;
}
