import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column('int')
  userId: number;

  @Column('int')
  assetId: number;

  @Column('varchar')
  name: string;

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
