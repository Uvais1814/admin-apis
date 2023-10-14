import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, RepositoryNotTreeError } from 'typeorm';
import { GrnEntryEntity } from '../approved/entites/grn-entry.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';

@Injectable()
export class InProgressService {
  constructor(
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>,
    @InjectRepository(SortEntity)
    private readonly SortRepo: Repository<SortEntity>
  ) { }

  async getGrnEntries(DTPFromDate: Date, DTPToDate: Date, plantno: string, Qry?: string): Promise<any[]> {
    const queryBuilder = this.GrnRepo
      .createQueryBuilder('g')
      .select('g.GrnID, g.LotNo AS ConfNo, g.LeftRoll AS RollNo, s.SortNo, s.Construction, g.DeclareMeter, g.DeclareWeight, g.GrnDate, g.SetNo AS MacNo, g.WorkCenter AS LoomNo, g.Vendorcode, g.VendorName, g.GLM, g.GSM, g.EPI, g.PPI, g.WIDTH, g.BeamNo1 AS BeamNo, g.BeamNo1Mtr AS BeamMeter, g.Priority, g.sortid')
      .leftJoin('MastSort', 's', 'g.SortID = s.SortId')
      .where('g.ActiveStatus = :activeStatus', { activeStatus: '1' })
      .andWhere('g.StatusInfo = :statusInfo', { statusInfo: '2' })
      .andWhere('g.GrnDate BETWEEN :fromDate AND :toDate', { fromDate: DTPFromDate, toDate: DTPToDate })
      .andWhere('g.Plant = :plantNo', { plantNo: plantno })
      .andWhere('s.Plant = :plantNo', { plantNo: plantno })
    if (Qry && Qry.trim() !== '') {
      queryBuilder.andWhere(Qry)
    }
    return queryBuilder.orderBy('g.GrnDate').getRawMany();
  }

  async getSort(DTPFromDate: Date, DTPToDate: Date, plantno: string): Promise<any[]> {
    return this.GrnRepo
      .createQueryBuilder('g')
      .select('DISTINCT g.SortID, s.SortNo')
      .leftJoin('MastSort', 's', 'g.SortID = s.SortID')
      .where('g.ActiveStatus = :activeStatus', { activeStatus: '1' })
      .andWhere('g.ByProcess =:Process', { Process: 'Grey' })
      .andWhere('g.StatusInfo = :statusInfo', { statusInfo: '2' })
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
      .andWhere('g.StatusInfo = :statusInfo', { statusInfo: '2' })
      .andWhere('g.GrnDate BETWEEN :fromDate AND :toDate', { fromDate: DTPFromDate, toDate: DTPToDate })
      .andWhere('g.Plant = :plantNo', { plantNo: plantno })
      .andWhere('s.Plant = :plantNo', { plantNo: plantno })
      .getRawMany();
  }

  async getLoomWithSortID(DTPFromDate: Date, DTPToDate: Date, plantno: string, SortID: string): Promise<any[]> {
    return this.GrnRepo
      .createQueryBuilder('g')
      .select('DISTINCT g.GrnID, g.LeftRoll')
      .leftJoin('MastSort', 's', 'g.SortID = s.SortID')
      .where('g.ActiveStatus = :activeStatus', { activeStatus: '1' })
      .andWhere('g.ByProcess =:Process', { Process: 'Grey' })
      .andWhere('g.StatusInfo = :statusInfo', { statusInfo: '2' })
      .andWhere('s.SortID =:sort', { sort: SortID })
      .andWhere('g.GrnDate BETWEEN :fromDate AND :toDate', { fromDate: DTPFromDate, toDate: DTPToDate })
      .andWhere('g.Plant = :plantNo', { plantNo: plantno })
      .andWhere('s.Plant = :plantNo', { plantNo: plantno })
      .getRawMany();
  }
}

