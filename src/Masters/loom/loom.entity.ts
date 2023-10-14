import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

Entity({ name: 'mastloom' })
export class LoomEntity {
  @PrimaryGeneratedColumn()
  LoomID: number;

  @Column({ default: '' })
  shedname: string;

  @Column({ default: '' })
  loomcode: string;

  @Column({ default: '' })
  loomname: string;

  @Column({ default: '' })
  VendorName: string;

  @Column({ default: '' })
  Type: string;

  @Column({ default: '' })
  EntryDate: string;

  @Column({ default: 1 })
  Activestatus: number;

  @Column({ default: '' })
  Plant: string;
}