import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Creator } from './creator';

@Entity()
export class Follow extends BaseEntity {
  @Column('int')
  userId: number;

  @Column('int')
  creatorId: number;

  @ManyToOne('Creator')
  creator: Creator;

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
