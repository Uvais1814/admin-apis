import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastfabrictype' })

export class FabricTypeEntity {
  @PrimaryGeneratedColumn()
  FabricTypeID: number;

  @Column({ default: '' })
  CustomerType: string;

  @Column({ default: '' })
  Code: string;

  @Column({ default: '' })
  Type: String;

  @Column({ default: '' })
  EntryDate: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;

}