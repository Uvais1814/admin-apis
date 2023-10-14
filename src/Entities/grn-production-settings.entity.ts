import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'GrnProductionSettings' })
export class GrnProductionSettingEntity {
  @PrimaryGeneratedColumn()
  ProductionID: number;

  @Column({ default: '' })
  ProductionType: string;

  @Column({ default: '' })
  Requirement: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}