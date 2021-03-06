import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Trophy extends BaseEntity {
  @Column('int')
  transactionId: number;

  @Column('int')
  assetId: number;

  @Column('int')
  userId: number;

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
