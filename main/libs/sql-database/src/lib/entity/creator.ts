import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Asset } from './asset';
import { Follow } from './follow';

@Entity()
export class Creator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('text')
  description: string;

  @Column('varchar')
  avatarUrl: string;

  @Column('int')
  userId: number;

  @OneToMany('Asset', 'creator')
  assets: Asset[];

  @OneToMany('Follow', 'creator')
  follows: Follow[];
}
