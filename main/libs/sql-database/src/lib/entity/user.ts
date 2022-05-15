import {
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Entity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail } from 'class-validator';

import { Creator } from './creator';
import { DailyTopUp } from './dailyTopUp';

@Entity()
export class User extends BaseEntity {
  @Column('varchar')
  @IsEmail()
  email: string;

  @Column('int')
  creatorId: number;

  @Column('int')
  dailyTopUpId: number;

  @OneToOne('Creator')
  @JoinColumn()
  creator: Creator;

  @OneToOne('DailyTopUp')
  @JoinColumn()
  dailyTopUp: DailyTopUp;

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
