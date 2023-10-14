import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastinspectionshed' })
export class InspectionShedEntity {
  @PrimaryGeneratedColumn()
  InspectionShedID: number;

  @Column({ default: '' })
  InspectionShedCode: string;

  @Column({ default: '' })
  InspectionShedName: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}