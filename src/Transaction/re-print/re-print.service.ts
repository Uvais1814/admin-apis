import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { Repository, RepositoryNotTreeError } from 'typeorm';

@Injectable()
export class RePrintService {
  constructor(
    @InjectRepository(SortEntity)
    private readonly SortRepo: Repository<SortEntity>,
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>,
    @InjectRepository(InspectionMain)
    private readonly InspRepo: Repository<InspectionMain>
  ) { }

  async Sort(DTPfromDate: Date, DTPtoDate: Date, Plant: string): Promise<any[]> {
    return this.SortRepo
      .createQueryBuilder('S')
      .select('DISTINCT S.SortID, S.SortNo')
      .innerJoin('InspectionMain', 'I', 'S.SortID = I.InspSortID')
      .where('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async LoadDetails(DTPfromDate: Date, DTPtoDate: Date, Plant: string, query?: string): Promise<any[]> {
    const queryBuilder = this.GrnRepo
      .createQueryBuilder('G')
      .select('I.InspPieceNo as PieceNo, G.Material as Article, g.MatDescr as Description, G.SalesOrderNo as SaleOrder, I.InspTotalMeter as `Length(M)`, I.ExtraField1 as `Std.Wt(KG)`, G.SortNo as Sort, I.Grade as QualityGrd, I.NetWeight as `Act.Wt(KG)`, G.SupplierLot as `Supp.Lot`, M.PrinterShareName as PrinterName, G.Soline, G.BeamNo1, G.WorkCenter, G.ProdOrder')
      .innerJoin('InspectionMain', 'I', 'G.GrnId = I.InspGrnId')
      .innerJoin('MastInspectionMachine', 'M', 'I.InspMachineID = M.InspectionMachineID')
      .where('I.ActiveStatus =:status', { status: '1' })
      .andWhere('I.InspEndDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .andWhere('G.Plant = :plantNo', { plantNo: Plant })
    if (query && query.trim() != "") {
      queryBuilder.andWhere(query)
    }
    return queryBuilder.getRawMany();
  }

  async NetWeight(NetWeight: number, GrossWeight: number, ExtraField1: string, piece: string, plant: string): Promise<InspectionMain[]> {
    const InspectionWeight = await this.InspRepo.find({
      where: {
        InspPieceNo: piece,
        Plant: plant,
        ActiveStatus: 1,
      },
    });
    for (const weight of InspectionWeight) {
      weight.NetWeight = NetWeight;
      weight.GrossWeight = GrossWeight;
      weight.ExtraField1 = ExtraField1;
      await this.InspRepo.save(weight);
    }
    return InspectionWeight;
  }

  async BatchWdSort(sortId: number, plant: string): Promise<InspectionMain[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspID, I.InspPieceNo, G.InspectionType')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('InspSortID =:sort', { sort: sortId })
      .andWhere('I.ActiveStatus =:status', { status: '1' })
      .andWhere('I.Plant :plant', { plant: plant })
      .andWhere('G.Plant :plant', { plant: plant })
      .orderBy('InspID', 'ASC')
      .getRawMany();
  }

  async Batch(plant: string): Promise<InspectionMain[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspID, I.InspPieceNo, G.InspectionType')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID = G.GrnID')
      .where('I.ActiveStatus =:status', { status: '1' })
      .andWhere('I.Plant :plant', { plant: plant })
      .andWhere('G.Plant :plant', { plant: plant })
      .orderBy('InspID', 'ASC')
      .getRawMany();
  }
}
