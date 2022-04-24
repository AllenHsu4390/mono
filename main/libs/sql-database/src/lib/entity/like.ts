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

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  assetId: number;

  @Column('datetime')
  createdAt: Date;

  @ManyToOne('User')
  user: User;

  @ManyToOne('Asset')
  asset: Asset;

  @BeforeInsert()
  addTimeStamp() {
    this.createdAt = new Date();
  }
}
