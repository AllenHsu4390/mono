import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum TransactionTypes {
  LIKE = 'like',
  UNKNOWN = 'unknown',
}

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: string;

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
}
