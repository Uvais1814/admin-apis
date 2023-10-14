import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastdesignation' })

export class DesignationEntity {
  @PrimaryGeneratedColumn()
  DesignationID: number;

  @Column({ default: '' })
  Code: string;

  @Column({ default: '' })
  Name: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}