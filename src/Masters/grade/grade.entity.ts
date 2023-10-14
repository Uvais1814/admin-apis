import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastgrade' })
export class GradeEntity {
  @PrimaryGeneratedColumn()
  GradeID: number;

  @Column({ default: '' })
  GradeCode: string;

  @Column({ default: '' })
  GradeName: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}