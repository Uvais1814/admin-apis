import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastsort' })

export class SortEntity {
  @PrimaryGeneratedColumn()
  SortId: number;

  @Column({ default: '' })
  SortNo: string;

  @Column({ default: '' })
  SortType: string;

  @Column({ default: '' })
  ByProcess: string;

  @Column({ default: '' })
  warpcount1: string;

  @Column({ default: '' })
  weftcount1: string;

  @Column({ default: '' })
  warpcount2: string;

  @Column({ default: '' })
  weftcount2: string;

  @Column({ default: '' })
  EPI: string;

  @Column({ default: '' })
  PPI: string;

  @Column({ default: 0 })
  Width: number;

  @Column({ default: '' })
  Glmgsmozm: string;

  @Column({ default: 0 })
  GlmgsmozmValue: number;

  @Column({ default: 0 })
  Gsm: number;

  @Column({ default: '' })
  Color: string;

  @Column({ default: '' })
  Construction: string;

  @Column({ default: '' })
  WeaveType: string;

  @Column({ default: 0 })
  NoofInsertion: number;

  @Column({ default: '' })
  NoofInsertion1: string;

  @Column({ default: '' })
  NoofInsertion2: string;

  @Column({ default: 0 })
  OZ: number;

  @Column({ default: '' })
  CutLine: string;

  @Column({ default: '' })
  SelvedgeType: string;

  @Column({ default: '' })
  SelvedgeWeave: string;

  @Column({ default: '' })
  SelvedgeWidth: string;

  @Column({ default: '' })
  EntryDate: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}