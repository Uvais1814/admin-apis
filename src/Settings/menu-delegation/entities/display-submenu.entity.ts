import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

Entity({ name: 'masterdispsubmenu' })
export class DisplaySubMenuEntity {
  @PrimaryGeneratedColumn()
  SubMenuID: number;

  @Column({ default: '' })
  MenuID: number;

  @Column({ default: '' })
  SubMenuName: string;

  @Column({ default: '' })
  SubMenuDispName: string;

  @Column({ default: 1 })
  status: number;

  @Column({ default: '' })
  Plant: string;
}