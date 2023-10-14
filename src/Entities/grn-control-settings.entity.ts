import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'grncontrolsettings' })
export class GrnControlSettingsEntity {
  @PrimaryGeneratedColumn()
  GrnControlID: bigint;

  @Column({ default: '' })
  GrnProduction: string;

  @Column({ default: '' })
  GrnControlName: string;

  @Column({ default: '' })
  GrnControlDisplayName: string;

  @Column({ default: '' })
  GrnControlCodingName: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}