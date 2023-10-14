import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InspSettingsEntity } from './insp-settings.entity';
import { CreateInspSettingsDTO } from './dto/create-insp-settings.dto';
import { UpdateInspSettingsDTO } from './dto/update-insp-settings.dto';

@Injectable()
export class InspSettingsService {
  constructor(
    @InjectRepository(InspSettingsEntity)
    private readonly InspSettingRepo: Repository<InspSettingsEntity>
  ) { }

  async getByCondition(): Promise<InspSettingsEntity[]> {
    return this.InspSettingRepo.find({
      where: {
        activestatus: 1,
      },
    });
  }

  async updateByCondition(updateData: UpdateInspSettingsDTO): Promise<InspSettingsEntity[]> {
    const InspSettingToUpdate = await this.InspSettingRepo.find({
      where: {
        activestatus: 1,
      },
    });
    for (const InspSet of InspSettingToUpdate) {
      InspSet.rollavailable = updateData.rollavailable,
        InspSet.rollentrythrough = updateData.rollentrythrough,
        InspSet.rolldigits = updateData.rolldigits,
        InspSet.rollgenformat = updateData.rollgenformat,
        InspSet.epippineeded = updateData.epippineeded,
        InspSet.widthunits = updateData.widthunits,
        InspSet.weightcall = updateData.weightcall,
        InspSet.headtailentry = updateData.headtailentry,
        InspSet.netweightentry = updateData.netweightentry,
        InspSet.tareweightentry = updateData.tareweightentry,
        InspSet.rollreportprint = updateData.rollreportprint,
        InspSet.barcodeprintsize = updateData.barcodeprintsize,
        InspSet.noofinspmc = updateData.noofinspmc,
        InspSet.inspapp = updateData.inspapp,
        InspSet.weaverentry = updateData.weaverentry,
        InspSet.gradedecisionby = updateData.gradedecisionby

      await this.InspSettingRepo.save(InspSet);
    }
    return InspSettingToUpdate;
  }

  // async updateByCondition(updateData: UpdateInspSettingsDTO): Promise<InspSettingsEntity[]> {
  //   const InspSettingToUpdate = await this.InspSettingRepo.find({
  //     where: {
  //       activestatus: 1,
  //     },
  //   });
  //   for (const InspSet of InspSettingToUpdate) {
  //     Object.assign(InspSet, updateData); // Merge updateData into InspSet
  //     await this.InspSettingRepo.save(InspSet);
  //   }
  //   return InspSettingToUpdate;
  // }
}
