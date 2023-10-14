import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeEntity } from 'src/Masters/grade/grade.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { In, Not, OrderedBulkOperation, Repository, RepositoryNotTreeError } from 'typeorm';
import { SAPUploadedEntity } from './sap-uploaded.entity';
import { SAPUploadedDTO } from './dto/sap-uploaded.dto';
import { DefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/defect-details.entity';

@Injectable()
export class FidastoSapService {
  constructor(
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>,
    @InjectRepository(SortEntity)
    private readonly SortRepo: Repository<SortEntity>,
    @InjectRepository(GradeEntity)
    private readonly GradeRepo: Repository<GradeEntity>,
    @InjectRepository(InspectionMain)
    private readonly InspRepo: Repository<InspectionMain>,
    @InjectRepository(SAPUploadedEntity)
    private readonly SAPRepo: Repository<SAPUploadedEntity>,
    @InjectRepository(DefectDetailsEntity)
    private readonly DefectDetailsRepo: Repository<DefectDetailsEntity>
  ) { }

  async Location(): Promise<GrnEntryEntity[]> {
    return this.GrnRepo
      .createQueryBuilder('G')
      .select('DISTINCT StLoc')
      .innerJoin('InspectionMain', 'I', 'I.InspGrnID = G.GrnID')
      .where("G.StLoc != ''")
      .andWhere('I.ActiveStatus =:status', { status: '1' })
      .andWhere('I.ApprovalStatus =:approve', { approve: 'Completed' })
      .andWhere('I.CutLookStatus =:cutlook', { cutlook: '2' })
      .getRawMany();
  }

  async Sort(DTPfromDate: Date, DTPtoDate: Date): Promise<any[]> {
    return this.SortRepo
      .createQueryBuilder('S')
      .select('DISTINCT SortID, SortNo as SortNo')
      .innerJoin('GrnEntry', 'G', 'S.SortID = G.SortId')
      .innerJoin('InspectionMain', 'I', 'S.SortID = I.InspSortID')
      .where('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .getRawMany();
  }

  async SortWdStatus(plant: string): Promise<any[]> {
    return this.SortRepo
      .createQueryBuilder('S')
      .select('DISTINCT S.SortID, S.SortNo as SortNo')
      .innerJoin('GrnEntry', 'G', 'S.SortID = G.SortId')
      .innerJoin('InspectionMain', 'I', 'S.SortID = I.InspSortID')
      .where('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('I.ApprovalStatus =:status', { status: 'Completed' })
      .andWhere('I.CutLookStatus =:cutLook', { cutLook: '2' })
      .andWhere('I.Plant =:Plant', { Plant: plant })
      .getRawMany();
  }

  async Grade(plant: string): Promise<GradeEntity[]> {
    return this.GradeRepo.find({
      select: ['GradeName', 'GradeID'],
      where: {
        ActiveStatus: 1,
        Plant: plant,
        GradeName: Not(In(['RW']))
      }
    });
  }

  async despatchDetails(append?: string): Promise<any[]> {
    const queryBuilder = this.InspRepo
      .createQueryBuilder('I')
      .select('DATEDIFF(NOW(), I.InspEndDate) as RollAge, I.InspID, I.InspEndDate as INSPDate, LotNo as ConfNo,  G.LeftRoll as ParentRoll, I.InspPieceNo as RollNo, G.StLoc, G.SupplierDcNo, InvNo, SalesOrderNo, Soline, PoItem as Po_Item, WorkCenter, VendorCode as Vendor_Code, VendorName, ProdOrder, OperationCode, OperationName, G.SortNo, G.Material, G.MatDescr as MatDescription, G.BeamNo1, G.MaterialDoc, I.InspEndShift as Shift, I.InspTotalMeter, InspTotalPoint, I.InspNoofDefect, I.InspSqMeter as SqMtr, I.InspSqYard, I.InspLinMeter, M.InspectionMachineCode as InspMachCode, M.InspectionMachineName as InspMachine, E.EmpCode as EmpCode, E.EmpName as Inspector, InspDuration, Grade, I.NoOfPiece, I.NetWeight, I.GrossWeight, I.Width, I.EPI, I.PPI, I.InspRemark as InspRemarks,G.StLoc as StorageLoc, I.Plant, I.InspStDate, I.InspStTime, I.InspEndDate, I.InspEndTime, I.ActualEndDate')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortID')
      .innerJoin('MastEmployee', 'E', 'I.InspLoginID = E.EmpId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = M.InspectionMachineID')
      .where('I.ActiveStatus =:status', { status: '1' })
      .andWhere('I.ApprovalStatus =:approval', { approval: 'Completed' })
      .andWhere('I.CutLookStatus =:cutLook', { cutLook: '2' })
    if (append && append.trim() != '') {
      queryBuilder.andWhere(append)
    }
    return queryBuilder.orderBy('RollAge', 'DESC').getRawMany()
  }

  async dataAvail(inspId: string): Promise<SAPUploadedEntity[]> {
    return this.SAPRepo.find({
      select: ['InspID'],
      where: {
        InspID: inspId,
        ActiveStatus: 1,
      },
    });
  }

  async SAPUploaded(updateData: SAPUploadedDTO): Promise<SAPUploadedEntity> {
    const newSAPuploaded = this.SAPRepo.create(updateData)
    await this.SAPRepo.save(newSAPuploaded);
    return newSAPuploaded;
  }

  async SqlQuery(Roll: string): Promise<InspectionMain[]> {
    const Approved = await this.InspRepo.find({
      where: {
        InspPieceNo: Roll
      },
    });
    for (const App of Approved) {
      App.ApprovalStatus = 'ERPUploaded';

      await this.InspRepo.save(App);
    }
    return Approved;
  }

  async RollDefect(Roll: string): Promise<any[]> {
    return this.DefectDetailsRepo
      .createQueryBuilder('D')
      .select('DISTINCT I.InspPieceNo as DefectRollNo, D.DeftStMeter, D.DeftEndMeter, D.Department, DeftCode, DeftName, DeftPoint, D.Deftremarks as DeftRemarks')
      .innerJoin('InspectionMain', 'I', 'I.InspSortID = D.DeftLeftId')
      .where('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('D.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('D.DeftLeftID in =:deftleftID}', { deftleftID: Roll })
      .orderBy('I.InspPieceNo')
      .orderBy('DeftStmeter')
      .getRawMany();
  }
}
