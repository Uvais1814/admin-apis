import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InspectionDTO } from 'src/DTOs/inspection-main.dto';
import { EmployeeEntity } from 'src/Masters/employee/employee.entity';
import { GradeEntity } from 'src/Masters/grade/grade.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { ActualEntryEntity } from 'src/PostInspection/delete-roll/entities/actual-entry.entity';
import { DefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/defect-details.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { LessThanOrEqual, Repository } from 'typeorm';


@Injectable()
export class CutLookingService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly GradeRepo: Repository<GradeEntity>,
    @InjectRepository(InspectionMain)
    private readonly InspRepo: Repository<InspectionMain>,
    @InjectRepository(DefectDetailsEntity)
    private readonly DefectDetailsRepo: Repository<DefectDetailsEntity>,
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>,
    @InjectRepository(SortEntity)
    private readonly SortRepo: Repository<SortEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly EmployeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(ActualEntryEntity)
    private readonly ActualRepo: Repository<ActualEntryEntity>
  ) { }

  async Grade(plant: string): Promise<{ GradeID: number, GradeName: string }[]> {
    return this.GradeRepo.find({
      select: ['GradeID', 'GradeName'],
      where: {
        ActiveStatus: 1,
        Plant: plant
      },
    })
  }

  async Sort(DTPfromDate: string, DTPtoDate: string, Plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('DISTINCT I.InspSortID, S.SortNo')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .where('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.CutLookStatus =:cutLook', { cutLook: '1' })
      .andWhere('JumboBatch =:jumbo', { jumbo: '0' })
      .andWhere('I.Grade <> :grade', { grade: 'RW' })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .getRawMany();
  }

  async Batch(DTPfromDate: string, DTPtoDate: string, Plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('InspID,InspPieceNo')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .where('I.ApprovalStatus = :approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.CutLookStatus = :cutLook', { cutLook: '1' })
      .andWhere('JumboBatch = :jumbo', { jumbo: '0' })
      .andWhere('I.Grade <> :grade', { grade: 'RW' }) // Assuming 'RW' is a string, use quotes here
      .andWhere('S.Plant = :plantNo', { plantNo: Plant })
      .andWhere('I.Plant = :plantNo', { plantNo: Plant })
      .andWhere('I.activestatus = :activestatus', { activestatus: '1' })
      .andWhere('DATE_FORMAT(I.InspEndDate, "%Y-%m-%d") BETWEEN :fromDate AND :toDate', {
        // fromDate: DTPfromDate.toISOString().slice(0, 10),
        // toDate: DTPtoDate.toISOString().slice(0, 10)
        fromDate: DTPfromDate.slice(0, 10),
        toDate: DTPtoDate.slice(0, 10)
      })
      .getRawMany();
  }

  async CmbBatchWdSort(InspSortID: number, Plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspID, I.InspPieceNo, G.InspectionType')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('InspSortID =:inspSortId', { inspSortId: InspSortID })
      .andWhere('I.ApprovalStatus = :approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.CutLookStatus = :cutLook', { cutLook: '1' })
      .andWhere('JumboBatch = :jumbo', { jumbo: '0' })
      .andWhere('I.Grade <> :grade', { grade: 'RW' }) // Assuming 'RW' is a string, use quotes here
      .andWhere('I.Plant = :plantNo', { plantNo: Plant })
      .andWhere('G.Plant = :plantNo', { plantNo: Plant })
      .andWhere('I.activestatus = :activestatus', { activestatus: '1' })
      .orderBy('InspID', 'ASC')
      .getRawMany();
  }

  async CmbBatch(Plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspID, I.InspPieceNo, G.InspectionType')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('I.ApprovalStatus = :approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.CutLookStatus = :cutLook', { cutLook: '1' })
      .andWhere('JumboBatch = :jumbo', { jumbo: '0' })
      .andWhere('I.Grade <> :grade', { grade: 'RW' }) // Assuming 'RW' is a string, use quotes here
      .andWhere('I.Plant = :plantNo', { plantNo: Plant })
      .andWhere('G.Plant = :plantNo', { plantNo: Plant })
      .andWhere('I.activestatus = :activestatus', { activestatus: '1' })
      .orderBy('InspID', 'ASC')
      .getRawMany();
  }

  // async LoadBatch(InspPieceNo: string, Plant: string): Promise<any[]> {
  //   return this.InspRepo
  //     .createQueryBuilder('I')
  //     .select('S.SortNo, I.InspPieceNo, M.InspectionMachineName, E.EmpName, I.InspEndDate, I.InspTotalMeter, I.InspNoofDefect, I.InspTotalPoint, I.Grade, I.InspSqMeter, I.InspSqYard, I.InspLinMeter, I.EPI, I.PPI, I.Width')
  //     .innerJoin('MastSort', 'S', 'I.InspGrnID = S.SortId')
  //     .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = M.InspectionMachineID')
  //     .innerJoin('MastEmployee', 'E', 'I.InspLoginID = E.EmpId')
  //     .where('I.InspPieceNo =:Piece', { Piece: InspPieceNo })
  //     .andWhere('JumboBatch = :jumbo', { jumbo: '0' })
  //     .andWhere('I.CutLookStatus = :cutLook', { cutLook: '1' })
  //     .andWhere('I.ApprovalStatus = :approvalStatus', { approvalStatus: 'Completed' })
  //     .andWhere('I.Grade <> :grade', { grade: 'RW' }) // Assuming 'RW' is a string, use quotes here
  //     .andWhere('I.Plant = :plantNo', { plantNo: Plant })
  //     .andWhere('S.Plant = :plantNo', { plantNo: Plant })
  //     .andWhere('M.Plant = :plantNo', { plantNo: Plant })
  //     .andWhere('E.Plant = :plantNo', { plantNo: Plant })
  //     .getRawMany();
  // }

  async LoadBatch(PieceNo: string, Plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('S.SortNo,I.InspPieceNo,M.InspectionMachineName,E.EmpName,I.InspEndDate,I.InspTotalMeter,I.InspNoofDefect,I.InspTotalPoint,I.Grade,I.InspSqMeter,I.InspSqYard,I.InspLinMeter,I.EPI,I.PPI,I.WIDTH')
      .innerJoin('MastEmployee', 'E', 'I.InspLoginID =E.EmpId')
      .innerJoin('MastSort', 'S', 'I.InspSortID =S.SortId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID =M.InspectionMachineID')
      .where('I.InspPieceNo =:Piece', { Piece: PieceNo })
      .andWhere('JumboBatch = :jumbo', { jumbo: '0' })
      .andWhere('I.CutLookStatus = :cutLook', { cutLook: '1' })
      .andWhere('I.ApprovalStatus = :approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.Grade <> :grade', { grade: 'RW' })
      .andWhere('I.Plant = :plantNo', { plantNo: Plant })
      .andWhere('S.Plant = :plantNo', { plantNo: Plant })
      .andWhere('M.Plant = :plantNo', { plantNo: Plant })
      .andWhere('E.Plant = :plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async Defect(Roll: string, Plant: string): Promise<any[]> {
    return this.DefectDetailsRepo
      .createQueryBuilder('D')
      .select('DeftStMeter as FromMtr, DeftEndMeter as ToMtr, DeftCode as Code, DeftPoint as Pts, DeftRemarks as Remark')
      .where('D.DeftLeftID =:left or D.DeftRightID =:right', { left: Roll, right: Roll })
      .andWhere('Plant =:plantNo', { plantNo: Plant })
      .andWhere('ActiveStatus =:activeStatus', { activeStatus: '1' })
      .orderBy('DeftEndMeter', 'ASC')
      .getRawMany();
  }

  async GrnID(RollNo: string, plantNo: string): Promise<{ InspGrnID: string }[]> {
    return this.InspRepo.createQueryBuilder('inspectionMain')
      .select('DISTINCT inspectionMain.InspGrnID', 'InspGrnID')
      .where('inspectionMain.InspPieceNo = :rollNo', { rollNo: RollNo })
      .andWhere('inspectionMain.ActiveStatus = :activeStatus', { activeStatus: 1 })
      .andWhere('inspectionMain.Plant = :plantNo', { plantNo: plantNo })
      .getRawMany();
  }

  async Width(grnid: number, plant: string): Promise<SortEntity[]> {
    return this.SortRepo
      .createQueryBuilder('S')
      .select('G.OZ, G.Width')
      .innerJoin('GrnEntry', 'G', 'S.SortId = G.SortID')
      .where('G.GrnID =:grn', { grn: grnid })
      .andWhere('S.Plant =:Plant', { Plant: plant })
      .andWhere('G.Plant =:Plant', { Plant: plant })
      .getRawMany();
  }

  async InspMeters(roll: string, plant: string): Promise<InspectionMain[]> {
    return this.InspRepo.find({
      select: ['InspTotalMeter'],
      where: {
        InspPieceNo: roll,
        Plant: plant,
      },
      take: 1,
    });
  }

  async DefectDetails(CmbRollNo: string, ToMtrValue: number, plantno: string): Promise<any[]> {
    const query = this.DefectDetailsRepo
      .createQueryBuilder('dd')
      .select([
        'IFNULL(SUM(dd.DeftPoint), 0) as Points',
        'COUNT(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Major\' THEN 1 END) as NoOfMajor',
        'COUNT(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Normal\' THEN 1 END) as NoofMinor',
        'COUNT(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Continuous\' THEN 1 END) as NoofContinuous',
        'COUNT(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Mendable\' THEN 1 END) as NoofMendable',
        'COUNT(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'White Tag\' THEN 1 END) as NoofWhiteTag',
        'COUNT(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Red Tag\' THEN 1 END) as NoofRedTag',
        'COUNT(*) as NoofDefect',
        'IFNULL(SUM(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Major\' THEN dd.DeftPoint ELSE 0 END), 0) as NoOfMajorPoints',
        'IFNULL(SUM(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Normal\' THEN dd.DeftPoint ELSE 0 END), 0) as NoOfMinorPoints',
        'IFNULL(SUM(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Continuous\' THEN dd.DeftPoint ELSE 0 END), 0) as NoOfContinuousPoints',
        'IFNULL(SUM(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Mendable\' THEN dd.DeftPoint ELSE 0 END), 0) as NoOfwhitetagPoints',
        'IFNULL(SUM(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'White Tag\' THEN dd.DeftPoint ELSE 0 END), 0) as NoOfRedTagPoints',
        'IFNULL(SUM(CASE WHEN dd.DeftEndMeter <= :ToMtrValue AND dd.DeftRemarks = \'Red Tag\' THEN dd.DeftPoint ELSE 0 END), 0) as NoOfMendablePoints',
      ])
      .setParameter('CmbRollNo', CmbRollNo)
      .setParameter('ToMtrValue', ToMtrValue)
      .setParameter('plantno', plantno);

    const results = await query.getRawMany();
    return results[0];
  }

  async dss1(roll: string, plant: string): Promise<InspectionMain[]> {
    return this.InspRepo.find({
      where: {
        InspPieceNo: roll,
        Plant: plant
      },
    });
  }

  async InspID(Name: string, PlantNo: string): Promise<{ EmpId: number }[]> {
    return this.EmployeeRepo.find({
      select: ['EmpId'],
      where: {
        EmpName: Name,
        ActiveStatus: 1,
        Plant: PlantNo,
      },
    });
  }

  // async createInspectionMain(updateInspection: InspectionDTO): Promise<InspectionMain> {
  //   const newInspectionMain = await this.InspRepo.save(updateInspection);
  //   return newInspectionMain;
  // }

  async createInspectionMain(updateInspection: InspectionDTO): Promise<InspectionMain> {
    const newInspectionMain = await this.InspRepo.create(updateInspection)
    await this.InspRepo.save(newInspectionMain)
    return newInspectionMain;
  }

  async InspId(pieceNo: string, PlantNo: string): Promise<{ InspID: bigint }[]> {
    return this.InspRepo.find({
      select: ['InspID'],
      where: {
        InspPieceNo: pieceNo,
        Plant: PlantNo,
      },
    });
  }

  async TotalMeterXY(pieceNo: string, PlantNo: string): Promise<{ InspTotalMeter: number }[]> {
    return this.InspRepo.find({
      select: ['InspTotalMeter'],
      where: {
        InspPieceNo: pieceNo,
        Plant: PlantNo,
      },
    });
  }

  async InspDurationZ(pieceNo: string, PlantNo: string): Promise<{ InspDuration: string }[]> {
    return this.InspRepo.find({
      select: ['InspDuration'],
      where: {
        InspPieceNo: pieceNo,
        Plant: PlantNo,
      },
    });
  }

  async updateRollJoinInfo(Rollinfo: string, InspID: bigint): Promise<InspectionMain[]> {
    const rolljoinInfo = await this.InspRepo.find({
      where: {
        InspID: InspID,
      },
    });
    for (const roll of rolljoinInfo) {
      roll.RollJoinInfo = Rollinfo;

      await this.InspRepo.save(roll);
    }
    return rolljoinInfo;
  }

  async updateInspDuration(InspDuration: string, InspID: bigint): Promise<InspectionMain[]> {
    const inspDuration = await this.InspRepo.find({
      where: {
        InspID: InspID,
      },
    });
    for (const Duration of inspDuration) {
      Duration.InspDuration = InspDuration;

      await this.InspRepo.save(Duration);
    }
    return inspDuration;
  }

  async updateDefectDetails(FMtr: number, TMtr: number, CmbRollNo: string, plantno: string): Promise<void> {
    await this.DefectDetailsRepo
      .createQueryBuilder('dd')
      .update()
      .set({
        DeftStMeter: () => `DeftStMeter - ${FMtr}`,
        DeftEndMeter: () => `DeftEndMeter - ${FMtr}`,
      })
      .where('DeftStMeter > :FMtr', { FMtr })
      .andWhere('DeftEndMeter <= :TMtr', { TMtr })
      .andWhere('DeftLeftID = :CmbRollNo', { CmbRollNo })
      .andWhere('Plant = :plantno', { plantno })
      .execute();
  }

  async LR(ToMtrValue: number, CmbRollNo: string, plantno: string): Promise<{ DeftLeftID: string }[]> {
    return this.DefectDetailsRepo.find({
      select: ['DeftLeftID'],
      where: {
        DeftEndMeter: LessThanOrEqual(ToMtrValue),
        DeftLeftID: CmbRollNo,
        Plant: plantno,
      },
    });
  }

  async updateInspIDRight(InspID: number, DeftRightID: string, DeftEndMeter: number, plantno: string): Promise<void> {
    await this.DefectDetailsRepo
      .createQueryBuilder('dd')
      .update()
      .set({
        InspID: InspID,
        DeftRightID: DeftRightID,

      })
      .where('DeftEndMeter <= :TMtr', { DeftEndMeter })
      .andWhere('DeftRightID = :CmbRollNo', { DeftRightID })
      .andWhere('Plant = :plantno', { plantno })
      .execute();
  }

  async updateInspIDLeft(InspID: number, DeftLeftID: string, DeftEndMeter: number, plantno: string): Promise<void> {
    await this.DefectDetailsRepo
      .createQueryBuilder('dd')
      .update()
      .set({
        InspID: InspID,
        DeftLeftID: DeftLeftID,

      })
      .where('DeftEndMeter <= :TMtr', { DeftEndMeter })
      .andWhere('DeftRightID = :CmbRollNo', { DeftLeftID })
      .andWhere('Plant = :plantno', { plantno })
      .execute();
  }

  async widthID(Roll: string): Promise<{ AddWidthID: number }[]> {
    return this.ActualRepo.find({
      select: ['AddWidthID'],
      where: {
        RollNo: Roll,
      },
    });
  }

  async updateActualEntry(RollNew: string, Roll: string): Promise<void> {
    const Actual = await this.ActualRepo.find({
      where: {
        RollNo: Roll,
      },
    });
    for (const act of Actual) {
      act.RollNo = RollNew,
        await this.ActualRepo.save(act);
    }
  }

  async insertActualEntryFromWidthId(widthId: string): Promise<void> {
    await this.ActualRepo
      .createQueryBuilder()
      .insert()
      .into(ActualEntryEntity)
      .values({
        EPI: () => `'EPI'`, // Replace with the actual column names or values from the source table
        PPI: () => `'PPI'`,
        Width: () => `'Width'`,
        CutLineEntry: () => `'CutLineEntry'`,
        SatinBandA: () => `'SatinBandA'`,
        SatinBandB: () => `'SatinBandB'`,
        SatinBandC: () => `'SatinBandC'`,
        SatinBandD: () => `'SatinBandD'`,
        SatinBandE: () => `'SatinBandE'`,
        SatinBandF: () => `'SatinBandF'`,
        RollNo: () => `'RollNo'`,
        Meter: () => `'Meter'`,
        EntryDate: () => `'EntryDate'`,
        Activestatus: () => `'ActiveStatus'`,
        Plant: () => `'Plant'`,
      })
      .select('1')
      .where('addwidthid = :widthId', { widthId })
      .execute();
  }

  async getAddWidthID(): Promise<ActualEntryEntity[]> {
    const result = await this.ActualRepo
      .createQueryBuilder('ActualEntry')
      .select('MAX(addwidthid)')
      .getRawOne();
    return result;
  }

  async updateActualEntry1(RollNew: string, ID: number): Promise<void> {
    const Actual = await this.ActualRepo.find({
      where: {
        AddWidthID: ID,
      },
    });
    for (const act of Actual) {
      act.RollNo = RollNew,
        await this.ActualRepo.save(act);
    }
  }

  async deleteInspectionMain(Roll: string, pl: string, activestatus: number): Promise<InspectionMain[]> {
    const InspectionToDelete = await this.InspRepo.find({
      where: {
        InspPieceNo: Roll,
        Plant: pl,
      },
    });
    for (const Insp of InspectionToDelete) {
      Insp.ActiveStatus = activestatus;
      await this.InspRepo.save(Insp);
    }
    return InspectionToDelete;
  }
}
