import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DesignationEntity } from 'src/Masters/designation/designation.entity';
import { EmployeeEntity } from 'src/Masters/employee/employee.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class LoginFormService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly EmployeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(DesignationEntity)
    private readonly DesignationRepo: Repository<DesignationEntity>
  ) { }

  async dss(plant: string): Promise<EmployeeEntity[]> {
    return this.EmployeeRepo.find({
      where: {
        ActiveStatus: 1,
        EmpType: Not('5'),
        Plant: plant,
      }
    })
  }

  async ds(userId: number, plant: string): Promise<EmployeeEntity> {
    const result = this.EmployeeRepo.findOne({
      select: ['EmpType'],
      where: {
        EmpId: userId,
        ActiveStatus: 1,
        Plant: plant
      },
    });
    return result;
  }

  async d(userID: number, plant: string): Promise<EmployeeEntity> {
    const result = await this.EmployeeRepo.findOne({
      select: ['EmpName'],
      where: {
        EmpId: userID,
        ActiveStatus: 1,
        Plant: plant
      }
    });
    return result;
  }

  async do(userID: number, plant: string): Promise<DesignationEntity> {
    return this.DesignationRepo
      .createQueryBuilder('d')
      .select('d.name')
      .innerJoin('MastEmployee', 'e', 'e.emptype = d.DesignationID')
      .where('d.ActiveStatus = :activestatus', { activestatus: '1' })
      .andWhere('e.empid = :userid', { userid: userID })
      .andWhere('e.Plant = :plant', { plant: plant })
      .getRawOne();
  }
}
