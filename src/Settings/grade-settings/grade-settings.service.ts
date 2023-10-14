import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GradeSettingsEntity } from './grade-settings.entity';
import { GradeSettingsDTO } from './dto/create-grade-settings.dto';
import { FabricTypeEntity } from 'src/Masters/fabric-type/fabric-type.entity';
import { GradeEntity } from 'src/Masters/grade/grade.entity';

@Injectable()
export class GradeSettingsService {
  constructor(
    @InjectRepository(GradeSettingsEntity)
    private readonly GradeSettingRepo: Repository<GradeSettingsEntity>,
    @InjectRepository(FabricTypeEntity)
    private readonly FabTypeRepo: Repository<FabricTypeEntity>,
    @InjectRepository(GradeEntity)
    private readonly GradeRepo: Repository<GradeEntity>
  ) { }

  async dSetGrade(): Promise<FabricTypeEntity[]> {
    return this.FabTypeRepo.find({
      select: ['FabricTypeID', 'Type']
    });
  }

  async dSetGrade1(plant: string): Promise<GradeEntity[]> {
    return this.GradeRepo.find({
      select: ['GradeID', 'GradeCode', 'GradeName'],
      where: {
        ActiveStatus: 1,
        Plant: plant
      }
    });
  }

  async findByCondition(status: number, plant: string): Promise<GradeSettingsEntity[]> {
    return this.GradeSettingRepo.find({
      where: {
        ActiveStatus: status,
        Plant: plant,
      },
    });
  }

  async create(gradeSetting: GradeSettingsDTO): Promise<GradeSettingsEntity> {
    const newGrade = this.GradeSettingRepo.create(gradeSetting);
    await this.GradeSettingRepo.save(newGrade);
    return newGrade;
  }

  async deleteByCondition(FabricType: string, InspProcess: string, Customer: string, activestatus: number): Promise<GradeSettingsEntity[]> {
    const gradeSettingsToDelete = await this.GradeSettingRepo.find({
      where: {
        TypeofFabric: FabricType,
        InspectionProcess: InspProcess,
        Customer: Customer,
        ActiveStatus: activestatus,
      },
    });

    // Perform the deletion operation on each retrieved company
    for (const gradeSettings of gradeSettingsToDelete) {
      // Perform any necessary deletion logic, such as setting the 'activestatus' to a specific value
      gradeSettings.TypeofFabric = FabricType,
        gradeSettings.InspectionProcess = InspProcess,
        gradeSettings.Customer = Customer;
      gradeSettings.ActiveStatus = activestatus;

      // Save the updated company back to the database or delete it using the appropriate method
      await this.GradeSettingRepo.save(gradeSettings); // Or use the appropriate delete method
    }
    return gradeSettingsToDelete;
  }

  async dscmbCust(fabtype: string, InspPro: string): Promise<GradeSettingsEntity[]> {
    return this.GradeSettingRepo
      .createQueryBuilder('tblgradesettings')
      .select('DISTINCT Customer')
      .where('TypeofFabric =:fab', { fab: fabtype })
      .andWhere('InspectionProcess =:Pro', { Pro: InspPro })
      .andWhere('ActiveStatus =:active', { active: 1 })
      .getRawMany()

  }

  async check(TypeFab: string, InspPro: string, Cust: string): Promise<GradeSettingsEntity[]> {
    return this.GradeSettingRepo.find({
      select: ['TypeofFabric', 'InspectionProcess', 'Customer'],
      where: {
        TypeofFabric: TypeFab,
        InspectionProcess: InspPro,
        Customer: Cust,
        ActiveStatus: 1,
      },
    });
  }

}