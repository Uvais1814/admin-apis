import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stat } from 'fs';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { Repository, Like, RepositoryNotTreeError } from 'typeorm';

@Injectable()
export class StatusChangeService {
  constructor(
    @InjectRepository(InspectionMachineEntity)
    private readonly MachineRepo: Repository<InspectionMachineEntity>,
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>
  ) { }

  async McNo(plant: string, name: string): Promise<InspectionMachineEntity[]> {
    return this.MachineRepo.find({
      select: ['InspectionMachineName'],
      where: {
        Plant: plant,
        InspectionMachineName: Like(name),
      },
    });
  }

  async RollDetailPendingForInsp(Plant: string, roll?: string): Promise<any[]> {
    const queryBuilder = this.GrnRepo
      .createQueryBuilder('G')
      .select('GrnId, LotNo as ConfNo, LeftRoll as RollNo, SetNo as MachineNo, S.SortNo, S.Construction, DeclareMeter, DeclareWeight, GrnDate, WorkCenter as LoomNo, VendorCode, VendorName, GLM, G.GSM, G.EPI, G.PPI, G.Width, BeamNo1 as BeamNo, BeamNo1Mtr as BeamMeter, G.Priority')
      .innerJoin('MastSort', 'S', 'G.SortId = S.SortId')
      .where('G.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('G.StatusInfo =:status', { status: '1' })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('LeftRoll =:left', { left: roll })
    if (roll && roll.trim() !== '') {
      queryBuilder.andWhere('LeftRoll =:left', { left: roll })
    }
    return queryBuilder.orderBy('g.GrnDate').getRawMany();
  }

  async RollDetailInprogress(Plant: string, roll?: string): Promise<any[]> {
    const queryBuilder = this.GrnRepo
      .createQueryBuilder('G')
      .select('GrnId, LotNo as ConfNo, LeftRoll as RollNo, SetNo as MachineNo, S.SortNo, S.Construction, DeclareMeter, DeclareWeight, GrnDate, WorkCenter as LoomNo, VendorCode, VendorName, GLM, G.GSM, G.EPI, G.PPI, G.Width, BeamNo1 as BeamNo, BeamNo1Mtr as BeamMeter, G.Priority')
      .innerJoin('MastSort', 'S', 'G.SortId = S.SortId')
      .where('G.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('G.StatusInfo =:status', { status: '2' })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
    if (roll && roll.trim() !== '') {
      queryBuilder.andWhere('LeftRoll =:left', { left: roll })
    }
    return queryBuilder.orderBy('g.GrnDate').getRawMany();
  }

  async RollDetailCompleted(Plant: string, roll: string): Promise<any[]> {
    const queryBuilder = this.GrnRepo
      .createQueryBuilder('G')
      .select('GrnId, LotNo as ConfNo, LeftRoll as RollNo, SetNo as MachineNo, S.SortNo, S.Construction, DeclareMeter, DeclareWeight, GrnDate, WorkCenter as LoomNo, VendorCode, VendorName, GLM, G.GSM, G.EPI, G.PPI, G.Width, BeamNo1 as BeamNo, BeamNo1Mtr as BeamMeter, G.Priority')
      .innerJoin('MastSort', 'S', 'G.SortId = S.SortId')
      .where('G.activestatus =:activestatus', { activestatus: '1' })
      .andWhere('G.StatusInfo =:status', { status: '3' })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
    if (roll && roll.trim() !== '') {
      queryBuilder.andWhere('LeftRoll =:left', { left: roll })
    }
    return queryBuilder.orderBy('g.GrnDate').getRawMany();
  }

  async StatusInfoWdRoll(roll: string, plant: string): Promise<GrnEntryEntity[]> {
    const StatusInfos = await this.GrnRepo.find({
      where: {
        LeftRoll: roll,
        Plant: plant,
      },
    });
    for (const status of StatusInfos) {
      status.StatusInfo = 1
      await this.GrnRepo.save(status);
    }
    return StatusInfos;
  }

  async StatusInfoWdMac(MacNo: string, roll: string, plant: string): Promise<GrnEntryEntity[]> {
    const StatusInfos = await this.GrnRepo.find({
      where: {
        LeftRoll: roll,
        Plant: plant,
      },
    });
    for (const status of StatusInfos) {
      status.StatusInfo = 1;
      status.SetNo = MacNo;
      await this.GrnRepo.save(status);
    }
    return StatusInfos;
  }


}
