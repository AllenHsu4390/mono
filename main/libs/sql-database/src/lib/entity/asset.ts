import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Creator } from './creator';

@Entity()
export class Asset extends BaseEntity {
  @ManyToOne('Creator')
  creator: Creator;

  @Column('int')
  creatorId: number;

  @Column('varchar')
  src: string;

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
