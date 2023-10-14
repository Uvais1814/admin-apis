import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefectDeptEntity } from './defectdept.entity';
import { CreateDefectDeptDTO } from './dto/createdefectdept.dto';
import { UpdateDefectDeptDTO } from './dto/updatedefectdept.dto';
import { FabricTypeEntity } from '../fabric-type/fabric-type.entity';

@Injectable()
export class DefectdeptService {
  constructor(
    @InjectRepository(DefectDeptEntity)
    private readonly DefectDeptRepo: Repository<DefectDeptEntity>,
    @InjectRepository(FabricTypeEntity)
    private readonly FabricTypeRepo: Repository<FabricTypeEntity>
  ) { }

  async findByCondition(status: number, plant: string): Promise<DefectDeptEntity[]> {
    return this.DefectDeptRepo.find({
      where: {
        ActiveStatus: status,
        Plant: plant,
      },
    });
  }

  async getCustomQuerys(): Promise<FabricTypeEntity[]> {
    return this.FabricTypeRepo.find({
      select: ['FabricTypeID', 'Type'],
      where: {
        ActiveStatus: 1
      }
    });
  }
  async getDefectDeptDetails(Plants: string): Promise<any[]> {
    return this.DefectDeptRepo
      .createQueryBuilder('D')
      .select('DefectDeptID, F.Type, ByProcess, D.Code, Name')
      .innerJoin('MastFabricType', 'F', 'D.FabricTypeID = F.FabricTypeID')
      .where('D.ActiveStatus =1')
      .andWhere('D.Plant =:plantno', { plantno: Plants })
      .getRawMany();
  }

  async createByCondition(createDefectDept: CreateDefectDeptDTO): Promise<void> {
    const { FabricTypeID, ByProcess, Code, Name, Image, EntryDate, Plant, ActiveStatus } = createDefectDept;

    const existingDefectDept = await this.DefectDeptRepo.findOne({
      where: {
        Code: Code,
        ActiveStatus: 1,
        Plant: Plant,
      },
    });

    if (!existingDefectDept) {
      const newDefectdept = this.DefectDeptRepo.create({
        FabricTypeID: FabricTypeID,
        ByProcess: ByProcess,
        Code: Code,
        Name: Name,
        Image: Image,
        EntryDate: EntryDate,
        Plant: Plant,
        ActiveStatus: ActiveStatus
      });
      await this.DefectDeptRepo.save(newDefectdept);
    }
  }

  async updateByCondition(defectdeptid: number, plant: string, updateData: UpdateDefectDeptDTO): Promise<DefectDeptEntity[]> {
    const defectsToUpdate = await this.DefectDeptRepo.find({
      where: {
        DefectDeptID: defectdeptid,
        Plant: plant,
      },
    });

    //Perform the update operation on each retrieved company
    for (const defects of defectsToUpdate) {
      //Update the properties of the company based on the updateData
      defects.FabricTypeID = updateData.FabricTypeID;
      defects.ByProcess = updateData.ByProcess;
      defects.Code = updateData.Code;
      defects.Name = updateData.Name;
      defects.EntryDate = updateData.EntryDate;

      //Save the updated company back to the database
      await this.DefectDeptRepo.save(defects);
    }
    return defectsToUpdate;
  }

  async deleteByCondition(ID: number, pl: string, activestatus: number): Promise<DefectDeptEntity[]> {
    const defectsToDelete = await this.DefectDeptRepo.find({
      where: {
        DefectDeptID: ID,
        Plant: pl,
      },
    });

    // Perform the deletion operation on each retrieved company
    for (const defectdept of defectsToDelete) {
      // Perform any necessary deletion logic, such as setting the 'activestatus' to a specific value
      defectdept.ActiveStatus = activestatus;

      // Save the updated company back to the database or delete it using the appropriate method
      await this.DefectDeptRepo.save(defectdept); // Or use the appropriate delete method
    }
    return defectsToDelete;
  }
}
