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

  @Column()
  creatorId: number;

  @Column()
  userId: number;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addTimeStamp() {
    this.createdAt = new Date();
  }
}
