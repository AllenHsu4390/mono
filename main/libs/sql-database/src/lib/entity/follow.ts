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

  @ManyToOne('User', 'follows')
  user: User;

  @ManyToOne('Creator', 'follows')
  creator: Creator;

  @Column('int')
  creatorId: number;

  @Column('int')
  userId: number;

  @Column('datetime')
  createdAt: Date;

  @BeforeInsert()
  addTimeStamp() {
    this.createdAt = new Date();
  }
}
