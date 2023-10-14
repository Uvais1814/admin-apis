import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { Not, Repository, In, RepositoryNotTreeError } from 'typeorm';
import { DespatchEntity } from './entities/despatch-entry.entity';
import { DespatchEntryDTO } from './despatch-entry..dto';

@Injectable()
export class JumboBatchService {
  constructor(
    @InjectRepository(InspectionMain)
    private readonly InspRepo: Repository<InspectionMain>,
    @InjectRepository(SortEntity)
    private readonly SortRepo: Repository<SortEntity>,
    @InjectRepository(DespatchEntity)
    private readonly DespatchRepo: Repository<DespatchEntity>
  ) { }

  async Despatch(plant: string, Qry?: string): Promise<InspectionMain[]> {
    const queryBuilder = this.InspRepo
      .createQueryBuilder('InspectionMain')
      .select('InspPieceNo, InspTotalMeter, Grade, InspTotalPoint, Width, InspLinMeter, InspSqMeter, InspEndDate, NetWeight, GrossWeight')
      .where('ActiveStatus = :activeStatus', { activeStatus: 1 })
      .andWhere("ApprovalStatus = :approvalStatus", { approvalStatus: 'Completed' })
      .andWhere("JumboBatch = :jumboBatch", { jumboBatch: 0 })
      .andWhere("InspTotalMeter <> :zeroValue", { zeroValue: 0 })
      .andWhere("Grade NOT IN (:...grades)", { grades: ["FRC", "B(Cont)"] })
      .andWhere("Plant = :plant", { plant: plant })
    if (Qry && Qry.trim() != "") {
      queryBuilder.andWhere(Qry)
    }
    return queryBuilder.getRawMany();
  }

  async TxtStWidth(sortId: number, plant: string): Promise<SortEntity[]> {
    return this.SortRepo.find({
      select: ['Width'],
      where: {
        SortId: sortId,
        ActiveStatus: 1,
        Plant: plant,
      },
    });
  }

  async SaveJumboEntry(updateData: DespatchEntryDTO): Promise<DespatchEntity> {
    const newDespatchEntry = await this.DespatchRepo.create(updateData)
    await this.DespatchRepo.save(newDespatchEntry)
    return newDespatchEntry;
  }

  async Flag(piece: string, plant: string): Promise<any[]> {
    const JumboBatch = await this.InspRepo.find({
      where: {
        InspPieceNo: piece,
        Plant: plant,
        ActiveStatus: 1,
      },
    });
    for (const Jumbo of JumboBatch) {
      Jumbo.JumboBatch = 1
      await this.InspRepo.save(Jumbo);
    }
    return JumboBatch;
  }

  async JumboBatch(plant: string): Promise<DespatchEntity[]> {
    return this.DespatchRepo
      .createQueryBuilder('DespatchEntry')
      .select('IFNULL (MAX(LEFT(JumboBatchNo, 4)),0) as Jumbo')
      .where("ActiveStatus = :activeStatus", { activeStatus: 1 })
      .andWhere('Plant =:plant', { plant: plant })
      .getRawOne();
  }

  async Sort(Plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('DISTINCT I.InspSortID, S.SortNo')
      .innerJoin('MastSort', 'S', 'I.InspSortID = S.SortId')
      .where('I.ApprovalStatus =:approvalStatus', { approvalStatus: 'Completed' })
      .andWhere('I.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('InspPieceNo NOT IN (SELECT RollNo  FROM DespatchEntry WHERE Plant =:plant)', { plant: Plant })
      .getRawMany();
  }
}
