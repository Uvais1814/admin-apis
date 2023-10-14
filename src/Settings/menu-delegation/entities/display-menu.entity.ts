import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'masterdispmenu' })
export class DisplayMenuEntity {
  @PrimaryGeneratedColumn()
  MenuID: number;

  @Column({ default: '' })
  MenuName: string;

  @Column({ default: '' })
  MenuDispName: string;

  @Column({ default: 1 })
  Status: number;

  @Column({ default: '' })
  Plant: string
}