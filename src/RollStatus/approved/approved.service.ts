import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { GrnEntryEntity } from './entites/grn-entry.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';

@Injectable()
export class ApprovedService {
  constructor(
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>,
    @InjectRepository(SortEntity)
    private readonly SortRepo: Repository<SortEntity>,
    @InjectRepository(InspectionMachineEntity)
    private readonly MacRepo: Repository<InspectionMachineEntity>
  ) { }

  async getGrnEntries(DTPFromDate: Date, DTPToDate: Date, plantno: string, Qry?: string): Promise<any[]> {
    const queryBuilder = this.GrnRepo
      .createQueryBuilder('g')
      .select('g.GrnID, g.LotNo AS ConfNo, g.LeftRoll AS RollNo, s.SortNo, s.Construction, g.DeclareMeter, g.DeclareWeight, g.GrnDate, g.SetNo AS MacNo, g.WorkCenter AS LoomNo, g.Vendorcode, g.VendorName, g.GLM, g.GSM, g.EPI, g.PPI, g.WIDTH, g.BeamNo1 AS BeamNo, g.BeamNo1Mtr AS BeamMeter, g.Priority, g.sortid')
      .leftJoin('mastSort', 's', 'g.SortID = s.SortID')
      .where('g.ActiveStatus = :activeStatus', { activeStatus: '1' })
      .andWhere('g.StatusInfo = :statusInfo', { statusInfo: '1' })
      .andWhere('g.GrnDate BETWEEN :fromDate AND :toDate', { fromDate: DTPFromDate, toDate: DTPToDate })
      .andWhere('g.Plant = :plantNo', { plantNo: plantno })
      .andWhere('s.Plant = :plantNo', { plantNo: plantno })
    if (Qry && Qry.trim() !== '') {
      queryBuilder.andWhere(Qry)
    }
    return queryBuilder.orderBy('g.GrnDate').getRawMany();
  }

  // async getMachineName(plant: string, macName: string): Promise<InspectionMachineEntity[]> {
  //   const query = `
  //   SELECT InspectionMachineName
  //   FROM MastInspectionMachine
  //   WHERE Plant='${plant}'
  //   AND InspectionMachineName like='${macName}'
  //   `;
  //   return this.MacRepo.query(query);
  // }

  async getMachineName(plant: string, macName: string): Promise<InspectionMachineEntity[]> {
    return this.MacRepo.find({
      select: ['InspectionMachineName'],
      where: {
        Plant: plant,
        InspectionMachineName: Like(`%${macName}%`),
      }
    });
  }

  // async getGrnID(leftroll: string, plants: string): Promise<GrnEntryEntity[]>{
  //   return this.GrnRepo.find({
  //     select:['GrnID'],
  //     where:{
  //       LeftRoll: leftroll,
  //       Plant: plants,
  //     }
  //   });
  // }

  async getGrnID(pnlRoll: string[], plantno: string): Promise<GrnEntryEntity[]> {
    return this.GrnRepo.createQueryBuilder('grnentry')
      .select('grnentry.GrnID', 'GrnID')
      .where('grnentry.LeftRoll IN (:...pnlRoll)', { pnlRoll })
      .andWhere('grnentry.Plant = :plantno', { plantno })
      .getRawMany();
  }

  async updateGrnEntries(grnUpdate: string[], cmbPriority: string, cmbMcNo: string, txtInst: string): Promise<void> {
    await this.GrnRepo
      .createQueryBuilder()
      .update(GrnEntryEntity)
      .set({
        Priority: cmbPriority,
        StatusInfo: 1,
        SetNo: cmbMcNo,
        internalRollNo: txtInst,
      })
      .where('grnid IN (:...grnIds)', { grnIds: grnUpdate })
      .andWhere('activestatus = :activeStatus', { activeStatus: '1' })
      .execute();
  }

  async updateSortEntries(NoofInsertion: string, Sortid: string): Promise<void> {
    await this.GrnRepo
      .createQueryBuilder()
      .update(SortEntity)
      .set({
        NoofInsertion1: NoofInsertion,
      })
      .where('sortid=:sortid', { sortid: Sortid })
      .andWhere('activestatus = :activeStatus', { activeStatus: '1' })
      .execute();
  }

  async getSort(DTPFromDate: Date, DTPToDate: Date, plantno: string): Promise<any[]> {
    return this.GrnRepo
      .createQueryBuilder('g')
      .select('DISTINCT g.SortID, s.SortNo')
      .leftJoin('MastSort', 's', 'g.SortID = s.SortID')
      .where('g.ActiveStatus = :activeStatus', { activeStatus: '1' })
      .andWhere('g.ByProcess =:Process', { Process: 'Grey' })
      .andWhere('g.StatusInfo = :statusInfo', { statusInfo: '1' })
      .andWhere('g.GrnDate BETWEEN :fromDate AND :toDate', { fromDate: DTPFromDate, toDate: DTPToDate })
      .andWhere('g.Plant = :plantNo', { plantNo: plantno })
      .andWhere('s.Plant = :plantNo', { plantNo: plantno })
      .getRawMany();
  }

  async getLoom(DTPFromDate: Date, DTPToDate: Date, plantno: string): Promise<any[]> {
    return this.GrnRepo
      .createQueryBuilder('g')
      .select('DISTINCT g.GrnID, g.LeftRoll')
      .leftJoin('MastSort', 's', 'g.SortID = s.SortID')
      .where('g.ActiveStatus = :activeStatus', { activeStatus: '1' })
      .andWhere('g.ByProcess =:Process', { Process: 'Grey' })
      .andWhere('g.StatusInfo = :statusInfo', { statusInfo: '1' })
      .andWhere('g.GrnDate BETWEEN :fromDate AND :toDate', { fromDate: DTPFromDate, toDate: DTPToDate })
      .andWhere('g.Plant = :plantNo', { plantNo: plantno })
      .andWhere('s.Plant = :plantNo', { plantNo: plantno })
      .getRawMany();
  }

  async getMachine(DTPFromDate: Date, DTPToDate: Date, plantno: string): Promise<any[]> {
    return this.MacRepo
      .createQueryBuilder('m')
      .select('DISTINCT InspectionMachineID, InspectionMachineName')
      .innerJoin('InspectionMain', 'I', 'I.InspMachineID = M.InspectionMachineID')
      .where('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPFromDate, toDate: DTPToDate })
      .andWhere('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('I.Plant =:plant', { plant: plantno })
      .andWhere('M.InspectionType =:Type', { Type: 'Grey' })
      .getRawMany();
  }

  async getLoomWithSortID(DTPFromDate: Date, DTPToDate: Date, plantno: string, SortID: string): Promise<any[]> {
    return this.GrnRepo
      .createQueryBuilder('g')
      .select('DISTINCT g.GrnID, g.LeftRoll')
      .leftJoin('MastSort', 's', 'g.SortID = s.SortID')
      .where('g.ActiveStatus = :activeStatus', { activeStatus: '1' })
      .andWhere('g.ByProcess =:Process', { Process: 'Grey' })
      .andWhere('g.StatusInfo = :statusInfo', { statusInfo: '1' })
      .andWhere('s.SortID =:sort', { sort: SortID })
      .andWhere('g.GrnDate BETWEEN :fromDate AND :toDate', { fromDate: DTPFromDate, toDate: DTPToDate })
      .andWhere('g.Plant = :plantNo', { plantNo: plantno })
      .andWhere('s.Plant = :plantNo', { plantNo: plantno })
      .getRawMany();
  }
}
