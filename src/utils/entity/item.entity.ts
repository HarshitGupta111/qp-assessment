import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Item' })
export class ItemEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    primary: true,
    unique: true,
  })
  ItemId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Name: string;

  @Column({ type: 'float', nullable: false })
  Price: number;

  @Column({ type: 'int', nullable: false })
  TotalQuantity: number;

  @Column({ type: 'int', nullable: false })
  RemainingQuantity: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  BookedQuantity: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  IsActive: boolean;

  @Column({ type: 'varchar', length: 100, nullable: false })
  CreatedAt: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  ModifiedAt: string;
}
