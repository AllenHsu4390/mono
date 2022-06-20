import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Session extends BaseEntity {
  @Column('int')
  userId: number;

  @Column('boolean')
  isLoggedIn: boolean;

  @ManyToOne('User')
  user: User;

  // default columns
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  createdAt: Date;

  @Column('datetime')
  updatedAt: Date;

  @BeforeInsert()
  timeStampCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  timeStampUpdate() {
    this.updatedAt = new Date();
  }
}
