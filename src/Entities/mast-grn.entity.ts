import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastgrnsettings' })
export class MastGrnSettingsEntity {
  @PrimaryGeneratedColumn()
  GrnSettingID: number;

  @Column({ default: '' })
  Name: string;

  @Column({ default: 1 })
  ActiveStatus: 1;

  @Column({ default: '' })
  Plant: string;
}