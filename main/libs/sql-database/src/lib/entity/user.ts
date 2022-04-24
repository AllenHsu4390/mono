import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Follow } from './follow';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  avatarUrl: string;

  @Column('int')
  balance: number;

  @OneToMany('Follow', 'user')
  follows: Follow[];
}
