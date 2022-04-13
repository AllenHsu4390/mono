import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Asset } from './asset';

@Entity()
export class Creator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  avatarUrl: string;

  @OneToMany((type) => Asset, (asset) => asset.creator) assets: Asset[];
}
