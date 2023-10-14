import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'adminsettings' })

export class InspSettingsEntity {
  @PrimaryGeneratedColumn()
  settingsID: number;

  @Column({ default: '' })
  rollavailable: string;

  @Column({ default: '' })
  rollentrythrough: string;

  @Column({ default: '' })
  rolldigits: string;

  @Column({ default: '' })
  rollgenformat: string;

  @Column({ default: '' })
  epippineeded: string;

  @Column({ default: '' })
  widthunits: string;

  @Column({ default: '' })
  weightcall: string;

  @Column({ default: '' })
  headtailentry: string;

  @Column({ default: '' })
  netweightentry: string;

  @Column({ default: '' })
  tareweightentry: string;

  @Column({ default: '' })
  rollreportprint: string;

  @Column({ default: '' })
  barcodeprintsize: string;

  @Column({ default: '' })
  noofinspmc: string;

  @Column({ default: '' })
  inspapp: string;

  @Column({ default: '' })
  weaverentry: string;

  @Column({ default: '' })
  gradedecisionby: string;

  @Column({ default: 1 })
  activestatus: number;
}