import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Creator } from './creator';

@Entity()
export class Asset extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Creator')
  creator: Creator;

  @Column('int')
  creatorId: number;

  @Column('varchar')
  src: string;
}
