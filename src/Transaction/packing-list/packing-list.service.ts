import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDTO } from 'src/DTOs/customer.dto';
import { CustomerEntity } from 'src/Entities/customer.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { Repository, EntityManager, RepositoryNotTreeError } from 'typeorm';
import { PackingListEntity } from './packing-list.entity';
import { PackingListDTO } from './packing-list.dto';


@Injectable()
export class PackingListService {
  constructor(
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<SortEntity>,
    @InjectRepository(CustomerEntity)
    private readonly CustRepo: Repository<CustomerEntity>,
    @InjectRepository(InspectionMain)
    private readonly InspRepo: Repository<InspectionMain>,
    @InjectRepository(PackingListEntity)
    private readonly PackRepo: Repository<PackingListEntity>
  ) { }

  async Sort(): Promise<GrnEntryEntity[]> {
    return this.GrnRepo
      .createQueryBuilder('G')
      .select('DISTINCT SortNo')
      .where('ActiveStatus =:status', { status: '1' })
      .getRawMany();
  }

  // async Sort(): Promise<GrnEntryEntity[]> {
  //   return this.GrnRepo
  //     .createQueryBuilder('G')
  //     .select('DISTINCT SortNo')
  //     .innerJoin('InspectionMain', 'I', 'G.GrnID=I.InspGrnID')
  //     .where('I.ActiveStatus =:status', { status: '1' })
  //     .andWhere('I.PackingListStatus =:plStatus', { plStatus: 0 })
  //     .getRawMany();
  // }

  async Customer(): Promise<CustomerEntity[]> {
    return this.CustRepo
      .createQueryBuilder('C')
      .select('DISTINCT CustomerName')
      .where('ActiveStatus =:status', { status: '1' })
      .getRawMany();
  }

  async CustomerID(Name: string): Promise<CustomerEntity> {
    return this.CustRepo.findOne({
      select: ['CustomerID'],
      where: {
        CustomerName: Name,
        ActiveStatus: 1
      }
    })
  }

  async CreateCustomer(InsertCustomer: CustomerDTO): Promise<CustomerEntity> {
    const newCustomer = await this.CustRepo.create(InsertCustomer)
    await this.CustRepo.save(newCustomer)
    return newCustomer;
  }

  async LoadRoll(Sort: string): Promise<any[]> {
    return this.InspRepo.createQueryBuilder('I')
      .select('I.InspPieceNo, G.SortNo, I.InspTotalPoint, I.Grade, I.Width, I.InspTotalMeter, I.NoOfPiece, I.GrossWeight, I.NetWeight, I.InspLinMeter, I.InspSqMeter, I.InspSqYard, I.InspRemark')
      .innerJoin('GrnEntry', 'G', 'I.InspGrnID=G.GrnID')
      .where('G.SortNo=:sortNo', { sortNo: Sort })
      .andWhere('I.ActiveStatus=:status', { status: 1 })
      .andWhere('I.PackingListStatus =:plStatus', { plStatus: 0 })
      .getRawMany();
  }

  async PresentDay(): Promise<string> {
    const queryResult = await this.GrnRepo.createQueryBuilder('G')
      .select('DATE_FORMAT(CURDATE(), "%d%m%y")', 'formattedDate')
      .getRawOne();

    return queryResult.formattedDate;
  }

  async PackingList(): Promise<any[]> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const queryResult = await this.PackRepo.createQueryBuilder('P')
      .select('COUNT(PL_ID)+1 AS plcount')
      .where('Entry_Date=:date', { date: currentDate })
      .getRawOne();

    return queryResult.plcount;
  }

  async CreatePackingList(InsertPLEntry: PackingListDTO): Promise<PackingListEntity> {
    const newPackingList = await this.PackRepo.create(InsertPLEntry);
    await this.PackRepo.save(newPackingList)
    return newPackingList;
  }

  async InspectionMain(PLNo: string, RollNo: string): Promise<void> {
    await this.InspRepo
      .createQueryBuilder()
      .update(InspectionMain)
      .set({ PackingListStatus: 1, PackingListNo: PLNo })
      .where('ActiveStatus =:status AND InspPieceNo IN (:rollin)', {
        status: '1',
        rollin: RollNo
      })
      .execute();
  }

}
