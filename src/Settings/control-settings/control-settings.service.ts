import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlSettingsEntity } from './control-settings.entity';
import { ControlSettingsDTO } from './dto/control-settings.dto';

@Injectable()
export class ControlSettingsService {
  constructor(
    @InjectRepository(ControlSettingsEntity)
    private readonly ControlRepo: Repository<ControlSettingsEntity>
  ) { }

  async getControlSettings(): Promise<ControlSettingsEntity[]> {
    const controlSettings = await this.ControlRepo.createQueryBuilder('controlSettings')
      .select([
        'ControlID',
        'ControlName',
        'DisplayName',
        'IFNULL(Type, \'\') as Type',
        'IFNULL(Size, \'\') as Size',
        'ActiveStatus',
      ])
      .where('ControlName NOT IN (:names)', { names: ['Options', 'EndDoff', 'Continuous'] })
      .orderBy('ControlID')
      .getRawMany();

    return controlSettings;
  }

  async getType(): Promise<number> {
    const queryBuilder = this.ControlRepo.createQueryBuilder('controlSettings');

    const result = await queryBuilder
      .select('COUNT(controlSettings.Type)', 'count')
      .where('controlSettings.Type =:type', { type: 'Main' })
      .getRawOne();

    return result.count;
  }

  async getSize(size: string): Promise<number> {
    const queryBuilder = this.ControlRepo.createQueryBuilder('controlSettings');

    const result = await queryBuilder
      .select('COUNT(controlSettings.Size)', 'count')
      .where('controlSettings.Size =:sizes', { sizes: size })
      .getRawOne();

    return result.count;
  }

  async getByCondition(): Promise<ControlSettingsEntity[]> {
    const controls = await this.ControlRepo
      .createQueryBuilder('control')
      .select(['ControlID', 'ControlName'])
      .where('ActiveStatus = :activeStatus', { activeStatus: 1 })
      .andWhere("ControlName NOT IN ('Options', 'EndDoff', 'Continuous')")
      .getRawMany();
    return controls;
  }

  async updateControlSettings(type: string, size: string): Promise<void> {
    await this.ControlRepo
      .createQueryBuilder()
      .update(ControlSettingsEntity)
      .set({ Type: type, Size: size })
      .where('ControlName NOT IN (:names)', { names: ['EndDoff', 'Continuous', 'Options'] })
      .execute();
  }

  async createByCondition(controlName: string, updateControls: ControlSettingsDTO): Promise<void> {
    const { ControlName, DisplayName, CodingName, Type, Size, ActiveStatus, Plant } = updateControls;

    const existingControls = await this.ControlRepo.findOne({
      where: {
        ControlName: controlName,
      },
    });

    if (!existingControls) {
      const newControls = this.ControlRepo.create({

        ControlName: ControlName,
        DisplayName: DisplayName,
        CodingName: CodingName,
        Type: Type,
        Size: Size,
        ActiveStatus: ActiveStatus,
      });
      await this.ControlRepo.save(newControls);
    }
  }

  async updateByCondition(controlID: number, updateData: ControlSettingsDTO): Promise<ControlSettingsEntity[]> {
    const controlToUpdate = await this.ControlRepo.find({
      where: {
        ControlID: controlID,
      },
    });

    //Perform the update operation on each retrieved company
    for (const control of controlToUpdate) {
      //Update the properties of the company based on the updateData
      control.DisplayName = updateData.DisplayName;
      control.Type = updateData.Type;
      control.Size = updateData.Size;
      control.ActiveStatus = updateData.ActiveStatus;

      //Save the updated company back to the database
      await this.ControlRepo.save(control);
    }
    return controlToUpdate;
  }

  async deleteByCondition(ID: string, activestatus: number): Promise<ControlSettingsEntity[]> {
    const controlsToDelete = await this.ControlRepo.find({
      where: {
        ControlName: ID,
        ActiveStatus: activestatus,
      },
    });

    // Perform the deletion operation on each retrieved company
    for (const controls of controlsToDelete) {
      // Perform any necessary deletion logic, such as setting the 'activestatus' to a specific value
      controls.ActiveStatus = activestatus;

      // Save the updated company back to the database or delete it using the appropriate method
      await this.ControlRepo.save(controls); // Or use the appropriate delete method
    }

    return controlsToDelete;
  }

}
