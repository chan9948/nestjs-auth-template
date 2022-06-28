import { Column, Entity } from 'typeorm';
import { IdType } from '../types/common.type';
import { BaseAuditEntity } from './base.entity';

@Entity()
export class UserEntity extends BaseAuditEntity {
  constructor(id: IdType, username: string, name: string) {
    super(id);
    this.username = username;
    this.name = name;
  }
  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  passwordSalt!: string;

  @Column()
  passwordHash!: string;
}
