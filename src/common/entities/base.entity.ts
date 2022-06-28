import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { IdType } from '../types/common.type';
import { UserEntity } from './user.entity';

export abstract class BaseAuditEntity extends BaseEntity {
  constructor(id: IdType) {
    super();
    this.id = id;
  }
  @PrimaryColumn()
  @Generated('uuid')
  id!: IdType;

  @CreateDateColumn()
  createdDate!: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @Column({ default: 1 })
  version: number;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;
}
