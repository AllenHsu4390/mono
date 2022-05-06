import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  assetId: number;

  @Column('datetime')
  createdAt: Date;

  @BeforeInsert()
  addTimeStamp() {
    this.createdAt = new Date();
  }
}
