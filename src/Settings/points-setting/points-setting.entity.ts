import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pointssetting' })
export class PointsSettingEntity {
  @PrimaryGeneratedColumn()
  PointsID: number;

  @Column({ default: '' })
  CustomPoints: string;

  @Column({ default: '' })
  Selection: string;

  @Column({ default: '' })
  Display: string;

  @Column({ default: '' })
  ValueGiven: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}