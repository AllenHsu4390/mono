import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export enum TransactionTypes {
  LIKE = 'like',
  MINT = 'mint',
  UNKNOWN = 'unknown',
}

@Entity()
export class Transaction extends BaseEntity {
  @Column('int')
  userId: number;

  @Column('int', {
    nullable: true,
  })
  actionId: number;

  @Column({
    type: 'enum',
    enum: TransactionTypes,
    default: TransactionTypes.UNKNOWN,
  })
  type: string;

  @Column('int')
  credit: number;

  @Column('int')
  debit: number;

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
