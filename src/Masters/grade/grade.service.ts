import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, RepositoryNotTreeError } from 'typeorm';
import { GradeEntity } from './grade.entity';
import { CreateGradeDTO } from './dto/creategrade.dto';
import { UpdateGradeDTO } from './dto/updategrade.dto';
import { FabricTypeEntity } from '../fabric-type/fabric-type.entity';
import { GradeSettingsEntity } from 'src/Settings/grade-settings/grade-settings.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly GradeRepo: Repository<GradeEntity>,
    @InjectRepository(FabricTypeEntity)
    private readonly FabRepo: Repository<FabricTypeEntity>,
    @InjectRepository(GradeSettingsEntity)
    private readonly GradeSetRepo: Repository<GradeSettingsEntity>
  ) { }

  async findByCondition(plant: string): Promise<GradeEntity[]> {
    return this.GradeRepo.find({
      where: {
        Plant: plant,
      },
    });
  }

  // async getFabricType(): Promise<FabricTypeEntity[]> {
  //   const query = `
  //   SELECT FabricTypeID, Type
  //   FROM MastFabricType`;
  //   return this.FabRepo.query(query);
  // }

  async getFabricType():Promise<FabricTypeEntity[]>{
    return this.FabRepo.find({
      select:['FabricTypeID','Type']
    });
  }

  // async getGradeByQuery(plantno: string): Promise<GradeEntity[]> {
  //   const querys = `
  //   SELECT GradeID, GradeCode, GradeName
  //   FROM MastGrade
  //   WHERE ActiveStatus'1'
  //   AND Plant='${plantno}'`;
  //   return this.GradeRepo.query(querys);
  // }

  async getGradeByQuery(plantno: string): Promise<GradeEntity[]>{
    return this.GradeRepo.find({
      select:['GradeID','GradeCode','GradeName'],
      where:{
        ActiveStatus: 1,
        Plant: plantno,
      }
    });
  }

  async getGradeSettings(typeoffab: string, Inspprocess: string, status: number): Promise<GradeSettingsEntity[]> {
    const queryz = `
    SELECT DISTINCT Customer
    FROM TblGradeSettings
    WHERE TypeOfFabric='${typeoffab}'
    AND InspectionProcess='${Inspprocess}'
    AND ActiveStatus='${status}'
    `;
    return this.GradeSetRepo.query(queryz);
  }


  async createByCondition(createGrade: CreateGradeDTO): Promise<void> {
    const { GradeCode, GradeName, ActiveStatus, Plant } = createGrade;

    const existingGrade = await this.GradeRepo.findOne({
      where: {
        GradeName: GradeName,
        ActiveStatus: 1,
        Plant: Plant,
      },
    });

    if (!existingGrade) {
      const newGrade = this.GradeRepo.create({
        GradeCode: GradeCode,
        GradeName: GradeName,
        ActiveStatus: ActiveStatus,
        Plant: Plant,
      });
      await this.GradeRepo.save(newGrade);
    }
  }
  async updateByCondition(gradeid: number, plant: string, updateData: UpdateGradeDTO): Promise<GradeEntity[]> {
    const gradesToUpdate = await this.GradeRepo.find({
      where: {
        GradeID: gradeid,
        Plant: plant,
      },
    });

    //Perform the update operation on each retrieved company
    for (const grade of gradesToUpdate) {
      //Update the properties of the company based on the updateData
      grade.GradeCode = updateData.GradeCode;
      grade.GradeName = updateData.GradeName;

      //Save the updated company back to the database
      await this.GradeRepo.save(grade);
    }
    return gradesToUpdate;
  }

  async deleteByCondition(ID: number, pl: string, activestatus: number): Promise<GradeEntity[]> {
    const gradesToDelete = await this.GradeRepo.find({
      where: {
        GradeID: ID,
        Plant: pl,
      },
    });

    // Perform the deletion operation on each retrieved company
    for (const grade of gradesToDelete) {
      // Perform any necessary deletion logic, such as setting the 'activestatus' to a specific value
      grade.ActiveStatus = activestatus;

      // Save the updated company back to the database or delete it using the appropriate method
      await this.GradeRepo.save(grade); // Or use the appropriate delete method
    }
    return gradesToDelete;
  }
}
