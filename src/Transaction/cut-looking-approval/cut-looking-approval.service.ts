import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CutLookingApprovalService {
  constructor(
    @InjectRepository(InspectionMain)
    private readonly InspRepo: Repository<InspectionMain>,
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>
  ) { }

  async MoveToCutLooking(roll: string): Promise<void> {
    const MoveCutLook = await this.InspRepo.find({
      where: {
        InspPieceNo: roll,
        ActiveStatus: 1,
      },
    });
    for (const move of MoveCutLook) {
      move.CutLookStatus = 1
      await this.InspRepo.save(move)
    }
  }

  async MoveToSAP(roll: string): Promise<void> {
    const MoveSAP = await this.InspRepo.find({
      where: {
        InspPieceNo: roll,
        ActiveStatus: 1,
      },
    });
    for (const move of MoveSAP) {
      move.CutLookStatus = 2
      await this.InspRepo.save(move)
    }
  }

  async Location(): Promise<GrnEntryEntity[]> {
    return this.GrnRepo
      .createQueryBuilder('G')
      .select('DISTINCT StLoc')
      .innerJoin('InspectionMain', 'I', 'I.InspGrnID = G.GrnId')
      .where('StLoc <>:stLoc', { stLoc: '' })
      .andWhere('I.ActiveStatus =:status', { status: '1' })
      .andWhere('I.ApprovalStatus = :approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.CutLookStatus = :cutLook', { cutLook: '2' })
      .getRawMany();
  }

  async DSS(Plant: string, Qry?: string): Promise<any[]> {
    const queryBuilder = this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo, S.SortNo, M.InspectionMachineName, I.InspEndDate, I.InspTotalMeter, I.Grade, E.EmpName, S.Width, I.NetWeight, I.InspNoofDefect, I.InspNoOfMajor, I.InspTotalPoint, I.InspSqMeter, I.InspLinMeter, I.InspSqYard, I.NOofPiece, G.StLoc as StorageLoc')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = InspectionMachineID')
      .innerJoin('MastEmployee', 'E', 'I.InspLoginID = E.EmpID')
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('G.ByProcess =:process', { process: 'Grey' })
      .andWhere('I.CutLookStatus = :cutLook', { cutLook: '0' })
      .andWhere("I.ReInspRemark IS NULL OR I.ReInspRemark <> 'Require'")
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('M.Plant =:plantNo', { plantNo: Plant })
      .andWhere('E.Plant =:plantNo', { plantNo: Plant })
    if (Qry && Qry.trim() !== '') {
      queryBuilder.andWhere(Qry)
    }
    return queryBuilder.getRawMany();
  }

  async DSS1(Qry: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo, S.SortNo, M.InspectionMachineName, I.InspEndDate, I.InspTotalMeter, I.Grade, E.EmpName, S.Width, I.NetWeight, I.InspNoofDefect, I.InspNoOfMajor, I.InspTotalPoint, I.InspSqMeter, I.InspLinMeter, I.InspSqYard, I.NOofPiece')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .innerJoin('MastSort', 'M', 'I.InspSortID = S.SortId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = InspectionMachineID')
      .innerJoin('MastEmployee', 'E', 'I.InspLogin = E.EmpID')
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('G.ByProcess =:process', { process: 'Grey' })
      .andWhere('I.CutLookStatus = :cutLook', { cutLook: '1' })
      .andWhere(Qry)
      .andWhere('I.ReInspRemark IS NULL or I.ReInspRemark <> Require')
      .getRawMany();
  }

  async DSS2(Qry: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo, S.SortNo, M.InspectionMachineName, I.InspEndDate, I.InspTotalMeter, I.Grade, E.EmpName, S.Width, I.NetWeight, I.InspNoofDefect, I.InspNoOfMajor, I.InspTotalPoint, I.InspSqMeter, I.InspLinMeter, I.InspSqYard, I.NOofPiece')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .innerJoin('MastSort', 'M', 'I.InspSortID = S.SortId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = InspectionMachineID')
      .innerJoin('MastEmployee', 'E', 'I.InspLogin = E.EmpID')
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'ERPUploaded' })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('G.ByProcess =:process', { process: 'Grey' })
      .andWhere(Qry)
      .andWhere('I.ReInspRemark IS NULL or I.ReInspRemark <> Require')
      .getRawMany();
  }

  async DSS3(Qry: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo, S.SortNo, M.InspectionMachineName, I.InspEndDate, I.InspTotalMeter, I.Grade, E.EmpName, S.Width, I.NetWeight, I.InspNoofDefect, I.InspNoOfMajor, I.InspTotalPoint, I.InspSqMeter, I.InspLinMeter, I.InspSqYard, I.NOofPiece')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .innerJoin('MastSort', 'M', 'I.InspSortID = S.SortId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = InspectionMachineID')
      .innerJoin('MastEmployee', 'E', 'I.InspLogin = E.EmpID')
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('G.ByProcess =:process', { process: 'Grey' })
      .andWhere('I.CutLookStatus = :cutLook', { cutLook: '2' })
      .andWhere(Qry)
      .andWhere('I.ReInspRemark IS NULL or I.ReInspRemark <> Require')
      .getRawMany();
  }


}
