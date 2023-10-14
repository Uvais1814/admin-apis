import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SAPUploadedEntity } from '../fidasto-sap/sap-uploaded.entity';

@Injectable()
export class TransFidasToSapService {
  constructor(
    @InjectRepository(SAPUploadedEntity)
    private readonly SAPUploadRepo: Repository<SAPUploadedEntity>
  ) { }

  async Sort(DTPfromDate: Date, DTPtoDate: Date): Promise<SAPUploadedEntity[]> {
    return this.SAPUploadRepo
      .createQueryBuilder('SAPUploaded')
      .select('DISTINCT SortNo')
      .where('ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('UploadedDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .getRawMany();
  }

  async PcNoWdSort(sortNo: number, DTPfromDate: Date, DTPtoDate: Date): Promise<SAPUploadedEntity[]> {
    return this.SAPUploadRepo
      .createQueryBuilder('SAPUploaded')
      .select('DISTINCT ParentRoll')
      .where('ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('sortNo =:sort', { sort: sortNo })
      .andWhere('UploadedDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .getRawMany();
  }

  async PcNo(DTPfromDate: Date, DTPtoDate: Date): Promise<SAPUploadedEntity[]> {
    return this.SAPUploadRepo
      .createQueryBuilder('SAPUploaded')
      .select('DISTINCT ParentRoll')
      .where('ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('UploadedDate BETWEEN :fromDate AND :toDate', { fromDate: DTPfromDate, toDate: DTPtoDate })
      .getRawMany();
  }

  async despatchDetails(
    fromDate: string,
    toDate: string,
    append?: string,
  ): Promise<SAPUploadedEntity[]> {
    const queryBuilder = this.SAPUploadRepo
      .createQueryBuilder('s')
      .select([
        'ParentRoll',
        'RollNo',
        'StLoc',
        'SupplierDcNo',
        'InvNo',
        'SalesOrderNo',
        'Soline',
        'PoNo',
        'Po_Item',
        'WorkCenter',
        'Vendor_Code',
        'VendorName',
        'ProdOrder',
        'OperationCode',
        'OperationName',
        'SortNo',
        'Material',
        'MatDescription',
        'BeamNo1',
        'MaterialDoc',
        'INSPDate',
        'Shift',
        'InspTotalMeter',
        'InspTotalPoint',
        'InspNoofDefect',
        'SqMtr',
        'InspSqYard',
        'InspLineMeter',
        'InspMachCode',
        'InspMachine',
        'EmpCode',
        'Inspector',
        'CASE WHEN s.InspDuration LIKE "%D%" THEN "01:01:01" ELSE CAST(s.InspDuration AS TIME) END AS InspDuration',
        'Grade',
        'NoOfPiece',
        'NetWeight',
        'GrossWeight',
        'Width',
        'EPI',
        'PPI',
        'InspRemarks',
        'Plant',
        'UploadedBy',
        'UploadedDate',
        'UploadedTime',
      ])
      .where('s.activestatus = :activeStatus', { activeStatus: '1' })
      .andWhere('s.UploadedDate BETWEEN :fromDate AND :toDate', {
        fromDate: fromDate.slice(0, 10),
        toDate: toDate.slice(0, 10),
      })
    if (append && append.trim() !== '') {
      queryBuilder.andWhere(append)
    }
    return queryBuilder.getRawMany();
  }
}
