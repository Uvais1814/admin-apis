import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDefectDTO } from './dto/createdefect.dto';
import { UpdateDefectDTO } from './dto/updatedefect.dto';
import { FabricTypeEntity } from '../fabric-type/fabric-type.entity';
import { DefectDeptEntity } from '../defectdept/defectdept.entity';
import { DefectEntity } from './defect.entity';

@Injectable()
export class DefectService {
  constructor(
    @InjectRepository(DefectEntity)
    private readonly DefectRepo: Repository<DefectEntity>,
    @InjectRepository(FabricTypeEntity)
    private readonly FabricTypeRepo: Repository<FabricTypeEntity>,
    @InjectRepository(DefectDeptEntity)
    private readonly DefectDeptRepo: Repository<DefectDeptEntity>,
  ) { }

  async findByCondition(status: number, plant: string): Promise<DefectEntity[]> {
    return this.DefectRepo.find({
      where: {
        ActiveStatus: status,
        Plant: plant,
      },
    });
  }

  async getByCustomQuery(type: string, process: string): Promise<number> {
    const querz = `
    SELECT count(defecttype) AS DeftType
    FROM MastDefect
    WHERE DefectType='${type}'
    AND ByProcess='${process}'
    AND ActiveStatus='1'
    `;
    return this.DefectRepo.query(querz);
  }

  // async getByCustomQuery(type, process: string): Promise<number> {
  //   const result = await this.DefectRepo
  //     .createQueryBuilder('MastDefect')
  //     .select('MastDefect.DefectType', 'DefectType')
  //     .where({
  //       DefectType: type,
  //       ByProcess: process,
  //       ActiveStatus: 1,
  //     })
  //     .getRawOne<{ Count: number }>();
  //   return result ? result.Count : 0;
  // }

  // async getDefectDept(FabicID: string): Promise<DefectDeptEntity[]> {
  //   const querys = `
  //   SELECT DefectDeptID, Name, Image
  //   FROM MastDefectDept
  //   WHERE ActiveStatus'1'
  //   AND FabricTypeID='${FabicID}'
  //   `;
  //   return this.DefectDeptRepo.query(querys)
  // }

  async getDefectDept(FabicID: number): Promise<DefectDeptEntity[]> {
    return this.DefectDeptRepo.find({
      select: ['DefectDeptID', 'Name', 'Image'],
      where: {
        ActiveStatus: 1,
        FabricTypeID: FabicID,
      }
    });
  }

  // async getFabricType(): Promise<FabricTypeEntity[]> {
  //   const query = `
  //   SELECT FabricTypeID, Type
  //   FROM MastFabricType
  //   WHERE ActiveStatus= '1' 
  //   `;
  //   return this.FabricTypeRepo.query(query);

  // }

  async getFabricType(): Promise<FabricTypeEntity[]> {
    return this.FabricTypeRepo.find({
      select: ['FabricTypeID', 'Type'],
      where: {
        ActiveStatus: 1
      }
    });
  }

  async getDefectsWithDetails(status: number): Promise<any[]> {
    return this.DefectRepo
      .createQueryBuilder('D')
      .select('D.DefectId, DE.Name, F.Type, D.Code, D.Defect, DefectType, D.ByProcess, Seriousness, D.Image, D.Points')
      .innerJoin('MastFabricType', 'F', 'D.FabricTypeID = F.FabricTypeID')
      .innerJoin('MastDefectDept', 'DE', 'DE.DefectDeptID = D.DefectDeptID')
      .where('D.ActiveStatus =:activestatus', { activestatus: status })
      .getRawMany();
  }


  async createByCondition(createDefect: CreateDefectDTO): Promise<void> {
    const { DefectDeptId, FabricTypeId, Code, Defect, DefectType, ByProcess, Seriousness, Image, Points, EntryDate, Plant } = createDefect;

    const existingDefects = await this.DefectRepo.findOne({
      where: {
        Code: Code,
        ActiveStatus: 1,
        EntryDate: EntryDate,
      },
    });

    if (!existingDefects) {
      const newDefects = this.DefectRepo.create({
        DefectDeptId: DefectDeptId,
        FabricTypeId: FabricTypeId,
        Code: Code,
        Defect: Defect,
        DefectType: DefectType,
        ByProcess: ByProcess,
        Seriousness: Seriousness,
        Image: Image,
        Points: Points,
        EntryDate: EntryDate,
        Plant: Plant
      });
      await this.DefectRepo.save(newDefects);
    }
  }

  async updateByCondition(defectid: number, plant: string, updateData: UpdateDefectDTO): Promise<DefectEntity[]> {
    const defectsToUpdate = await this.DefectRepo.find({
      where: {
        DefectId: defectid,
        Plant: plant,
      },
    });

    //Perform the update operation on each retrieved company
    for (const defects of defectsToUpdate) {
      //Update the properties of the company based on the updateData
      defects.DefectDeptId = updateData.DefectDeptId;
      defects.FabricTypeId = updateData.FabricTypeId;
      defects.Code = updateData.Code;
      defects.Defect = updateData.Defect;
      defects.DefectType = updateData.DefectType;
      defects.ByProcess = updateData.ByProcess;
      defects.Seriousness = updateData.Seriousness;
      defects.Points = updateData.Points;
      defects.EntryDate = updateData.EntryDate;

      //Save the updated company back to the database
      await this.DefectRepo.save(defects);
    }
    return defectsToUpdate;
  }

  async deleteByCondition(ID: number, pl: string, activestatus: number): Promise<DefectEntity[]> {
    const defectsToDelete = await this.DefectRepo.find({
      where: {
        DefectId: ID,
        Plant: pl,
      },
    });
    for (const defects of defectsToDelete) {
      defects.ActiveStatus = activestatus;
      await this.DefectRepo.save(defects);
    }
    return defectsToDelete;
  }
}
