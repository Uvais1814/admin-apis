import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastcontrolsettings' })

export class ControlSettingsEntity {
  @PrimaryGeneratedColumn()
  ControlID: number;

  @Column({ default: '' })
  ControlName: string;

  @Column({ default: '' })
  DisplayName: string;

  @Column({ default: '' })
  CodingName: string;

  @Column({ default: '' })
  Type: string;

  @Column({ default: '' })
  Size: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}