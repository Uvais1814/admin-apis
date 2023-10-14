import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from './entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { DefectDetailsEntity } from './entities/defect-details.entity';
import { ActualEntryEntity } from './entities/actual-entry.entity';


@Injectable()
export class DeleteRollService {
  constructor(
    @InjectRepository(SortEntity)
    private readonly SortRepo: Repository<SortEntity>,
    @InjectRepository(InspectionMain)
    private readonly InspRepo: Repository<InspectionMain>,
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>,
    @InjectRepository(DefectDetailsEntity)
    private readonly DeftRepo: Repository<DefectDetailsEntity>,
    @InjectRepository(ActualEntryEntity)
    private readonly ActualRepo: Repository<ActualEntryEntity>
  ) { }

  async getGreySort(DTPfromDate: Date, DTPtoDate: Date, Plant: string): Promise<any[]> {
    return this.SortRepo
      .createQueryBuilder('S')
      .select('DISTINCT I.InspSortID, S.SortNo')
      .innerJoin('InspectionMain', 'I', 'S.SortId = I.InspSortID')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('G.ByProcess =:process', { process: 'Grey' })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async getGreyRoll(DTPfromDate: Date, DTPtoDate: Date, Plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('InspPieceNo')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('G.ByProcess =:process', { process: 'Grey' })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async getFinalSort(DTPfromDate: Date, DTPtoDate: Date, Plant: string): Promise<any[]> {
    return this.SortRepo
      .createQueryBuilder('S')
      .select('DISTINCT I.InspSortID, S.SortNo')
      .innerJoin('InspectionMain', 'I', 'S.SortId = I.InspSortID')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('G.ByProcess =:process', { process: 'Final' })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async getFinalRoll(DTPfromDate: Date, DTPtoDate: Date, Plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('G.ByProcess =:process', { process: 'Final' })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async getCmbRollGrey(DTPfromDate: Date, DTPtoDate: Date, Plant: string, SortID: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('G.StatusInfo =:statusinfo', { statusinfo: '3' })
      .andWhere('G.ByProcess =:process', { process: 'Grey' })
      .andWhere('S.SortID =:sort', { sort: SortID })
      .andWhere('I.ReInspRemark IS NULL or I.ReInspRemark <> Require')
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async getCmbRollFinal(DTPfromDate: Date, DTPtoDate: Date, Plant: string, SortID: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('G.StatusInfo =:statusinfo', { statusinfo: '3' })
      .andWhere('G.ByProcess =:process', { process: 'Final' })
      .andWhere('S.SortID =:sort', { sort: SortID })
      .andWhere('I.ReInspRemark IS NULL or I.ReInspRemark <> Require')
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async getDSSGrey(DTPfromDate: Date, DTPtoDate: Date, Plant: string, Qry?: string): Promise<any[]> {
    const queryBuilder = this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo, S.SortNo, M.InspectionMachineName, I.InspEndDate, I.InspTotalMeter, I.Grade, E.EmpName, S.Width, I.NetWeight, I.InspNoofDefect, I.InspNoOfMajor, I.InspTotalPoint, I.InspSqMeter, I.InspLinMeter, I.InspSqYard, I.NOofPiece')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = InspectionMachineID')
      .innerJoin('MastEmployee', 'E', 'I.InspLoginID = E.EmpID')
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('G.ByProcess =:process', { process: 'Grey' })
      .andWhere('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
    if (Qry && Qry.trim() != '') {
      queryBuilder.andWhere(Qry);
    }
    return queryBuilder.getRawMany();
  }

  async getDSSFinal(DTPfromDate: Date, DTPtoDate: Date, Plant: string, Qry: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo, S.SortNo, M.InspectionMachineName, I.InspEndDate, I.InspTotalMeter, I.Grade, E.EmpName, S.Width, I.NetWeight, I.InspNoofDefect, I.InspNoOfMajor, I.InspTotalPoint, I.InspSqMeter, I.InspLinMeter, I.InspSqYard, I.NOofPiece')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .innerJoin('MastSort', 'M', 'I.InspSortID = S.SortId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = InspectionMachineID')
      .innerJoin('MastEmployee', 'E', 'I.InspLogin = E.EmpID')
      .andWhere('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('G.ByProcess =:process', { process: 'Final' })
      .andWhere('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere(Qry)
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  // async updateInspectionMain(status: number, piece: string, plantno: string): Promise<InspectionMain[]> {
  //   const query = `
  //   UPDATE InspectionMain
  //   SET ActiveStatus='${status}'
  //   WHERE InspPieceNo in '${piece}'
  //   AND Plant='${plantno}'
  //   `;
  //   return this.InspRepo.query(query);
  // }

  async updateInspectionMain(status: number, piece: string, plantno: string): Promise<InspectionMain[]> {
    const inspectionMainsToUpdate = await this.InspRepo.find({
      where: {
        InspPieceNo: In(piece.split(',')),
        Plant: plantno,
      },
    });

    inspectionMainsToUpdate.forEach(inspectionMain => {
      inspectionMain.ActiveStatus = status;
    });

    return this.InspRepo.save(inspectionMainsToUpdate);
  }



  async updateDefectDetails(status: number, deftLeft: string, plantno: string): Promise<DefectDetailsEntity[]> {
    const DefectDetailsToUpdate = await this.DeftRepo.find({
      where: {
        DeftLeftID: In(deftLeft.split(',')),
        Plant: plantno,
      }
    });
    DefectDetailsToUpdate.forEach(DefectDetailsEntity => {
      DefectDetailsEntity.ActiveStatus = status;
    });
    return this.DeftRepo.save(DefectDetailsToUpdate);
  }




  async updateActualEntry(status: number, roll: string, plantno: string): Promise<ActualEntryEntity[]> {
    const actualEntryToUpdate = await this.ActualRepo.find({
      where: {
        RollNo: In(roll.split(',')),
        Plant: plantno,
      }
    });
    actualEntryToUpdate.forEach(ActualEntryEntity => {
      ActualEntryEntity.Activestatus = status;
    });
    return this.ActualRepo.save(actualEntryToUpdate);
  }



  async updateExrafields(username: string, currentdate: string, piece: string, plantNo: string): Promise<InspectionMain[]> {
    const extraFieldsToUpdate = await this.InspRepo.find({
      where: {
        InspPieceNo: piece,
        Plant: plantNo,
      }
    });
    extraFieldsToUpdate.forEach(InspectionMain => {
      InspectionMain.ExtraField4 = username;
      InspectionMain.ExtraField3 = currentdate;
    });

    return this.InspRepo.save(extraFieldsToUpdate);
  }

}
