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

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  avatarUrl: string;

  @OneToMany('Asset', 'creator')
  assets: Asset[];

  @OneToMany('Follow', 'creator')
  follows: Follow[];
}
