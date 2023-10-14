import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'manualgrnfields' })
export class ManualGrnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  standardfields: string;

  @Column({ default: '' })
  customizedfields: string;

  @Column({ default: '' })
  defaultvalue: string;

  @Column({ default: 1 })
  activestatus: number;
}