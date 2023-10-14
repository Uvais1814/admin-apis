import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastergroupuserrole' })
export class GroupUserRoleEntity {
  @PrimaryGeneratedColumn()
  GroupID: number;

  @Column({ default: '' })
  UserRole: string;

  @Column({ default: '' })
  UserID: string;

  @Column({ default: '' })
  MenuID: number;

  @Column({ default: '' })
  SubMenuID: number;

  @Column({ default: 1 })
  status: number;

  @Column({ default: '' })
  Plant: string;
}