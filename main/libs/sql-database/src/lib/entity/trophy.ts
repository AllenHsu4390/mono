import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  BeforeInsert,
} from 'typeorm';
import { User } from './user';
import { Asset } from './asset';
import { Transaction } from './transaction';

@Entity()
export class Trophy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  transactionId: number;

  @Column('int')
  assetId: number;

  @Column('int')
  userId: number;

  @Column('datetime')
  createdAt: Date;

  @BeforeInsert()
  addTimeStamp() {
    this.createdAt = new Date();
  }
}
