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

  @ManyToOne('User')
  user: User;

  @ManyToOne('Asset')
  asset: Asset;

  @Column()
  userId: number;

  @Column()
  assetId: number;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addTimeStamp() {
    this.createdAt = new Date();
  }
}
