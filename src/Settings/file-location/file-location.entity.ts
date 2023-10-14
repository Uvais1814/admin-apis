import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastfilelocation' })

export class FileLocationEntity {
  @PrimaryGeneratedColumn()
  FID: number;

  @Column({ default: '' })
  MastInput: string;

  @Column({ default: '' })
  InputFile: string;

  @Column({ default: '' })
  OutputFile: string;

  @Column({ default: '' })
  ReportFile: string;

  @Column({ default: '' })
  AdminServerExe: string;

  @Column({ default: '' })
  InspServerExe: string;

  @Column({ default: '' })
  InspServerExeFinal: string;

  @Column({ default: '' })
  ReportServerExe: string;

  @Column({ default: '' })
  AdminInstalledPath: string;

  @Column({ default: '' })
  InspInstalledPath: string;

  @Column({ default: '' })
  InspInstalledPathFinal: string;

  @Column({ default: '' })
  ReportInstalledPath: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}