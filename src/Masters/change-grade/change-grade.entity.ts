import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastchangegrade' })
export class ChangeGradeEntity {
  @PrimaryGeneratedColumn()
  ChangeID: number;

  @Column({ default: '' })
  UserGrade: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}