import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  BeforeInsert,
} from 'typeorm';
import { User } from './user';
import { Creator } from './creator';

@Entity()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  creatorId: number;

  @Column('datetime')
  createdAt: Date;

  @ManyToOne('Creator')
  creator: Creator;

  @BeforeInsert()
  addTimeStamp() {
    this.createdAt = new Date();
  }
}
