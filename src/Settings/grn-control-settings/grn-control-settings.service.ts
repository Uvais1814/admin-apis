import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrnControlSettingsDTO } from 'src/DTOs/grn-control-settings.dto';
import { GrnControlSettingsEntity } from 'src/Entities/grn-control-settings.entity';
import { GrnProductionSettingEntity } from 'src/Entities/grn-production-settings.entity';
import { MastGrnSettingsEntity } from 'src/Entities/mast-grn.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GrnControlSettingsService {
  constructor(
    @InjectRepository(MastGrnSettingsEntity)
    private readonly MastGrnRepo: Repository<MastGrnSettingsEntity>,
    @InjectRepository(GrnProductionSettingEntity)
    private readonly GrnProdSetRepo: Repository<GrnProductionSettingEntity>,
    @InjectRepository(GrnControlSettingsEntity)
    private readonly GrnCtrlSettingsRepo: Repository<GrnControlSettingsEntity>
  ) { }

  async ControlName(): Promise<MastGrnSettingsEntity[]> {
    return this.MastGrnRepo
      .createQueryBuilder('M')
      .select('GrnSettingID,Name')
      .where('ActiveStatus =:status', { status: 1 })
      .orderBy('GrnSettingID')
      .getRawMany()
  }

  async ProductionType(): Promise<GrnProductionSettingEntity[]> {
    return this.GrnProdSetRepo
      .createQueryBuilder('G')
      .select('ProductionID,ProductionType')
      .where('ActiveStatus =:status', { status: 1 })
      .orderBy('ProductionID')
      .getRawMany()
  }

  async DSS(): Promise<GrnControlSettingsEntity[]> {
    return this.GrnCtrlSettingsRepo.find({
      select: ['GrnControlID', 'GrnControlName', 'GrnProduction', 'GrnControlDisplayName', 'GrnControlCodingName'],
      where: {
        ActiveStatus: 1
      }
    });
  }

  async createByCondition(createGrnCtrlSettings: GrnControlSettingsDTO): Promise<string> {
    const { GrnControlName, GrnControlDisplayName, GrnControlCodingName, GrnProduction } = createGrnCtrlSettings;

    const existingCtrlSettings = await this.GrnCtrlSettingsRepo.findOne({
      where: {
        GrnControlName: GrnControlName,
        GrnProduction: GrnProduction,
        ActiveStatus: 1
      },
    });
    if (!existingCtrlSettings) {
      const newControlSettings = this.GrnCtrlSettingsRepo.create({
        GrnControlName: GrnControlName,
        GrnControlDisplayName: GrnControlDisplayName,
        GrnControlCodingName: GrnControlCodingName,
        GrnProduction: GrnProduction,
        ActiveStatus: 1
      });
      await this.GrnCtrlSettingsRepo.save(newControlSettings);
    }
    else {
      return "Data Already Exist";
    }
  }

  async updateByCondition(controlID: bigint, updateGrnCtrlSettings: GrnControlSettingsDTO): Promise<void> {
    const ControlSettings = await this.GrnCtrlSettingsRepo.find({
      where: {
        GrnControlID: controlID
      }
    });
    for (const ctrl of ControlSettings) {
      ctrl.GrnControlName = updateGrnCtrlSettings.GrnControlName;
      ctrl.GrnProduction = updateGrnCtrlSettings.GrnProduction;
      ctrl.GrnControlDisplayName = updateGrnCtrlSettings.GrnControlDisplayName,
        ctrl.GrnControlCodingName = updateGrnCtrlSettings.GrnControlCodingName

      await this.GrnCtrlSettingsRepo.save(ctrl);
    }
  }

}
