import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';

export enum TransactionTypes {
  LIKE = 'like',
  MINT = 'mint',
  UNKNOWN = 'unknown',
}

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column('datetime')
  createdAt: Date;

  @BeforeInsert()
  addTimeStamp() {
    this.createdAt = new Date();
  }
}
