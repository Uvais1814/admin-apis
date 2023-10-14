import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointsSettingEntity } from './points-setting.entity';
import { UpdatePointsSettingDTO } from './dto/update-points-setting.dto';

@Injectable()
export class PointsSettingService {
  constructor(
    @InjectRepository(PointsSettingEntity)
    private readonly PointsRepo: Repository<PointsSettingEntity>
  ) { }

  async findAll(status: number): Promise<PointsSettingEntity[]> {
    return this.PointsRepo.find({
      where: {
        ActiveStatus: status,
      },
    });
  }

  async findByCondition(status: number): Promise<PointsSettingEntity[]> {
    return this.PointsRepo.find({
      select: ['PointsID', 'CustomPoints'],
      where: {
        ActiveStatus: status,
      },
    });
  }

  async createByCondition(updatePoints: UpdatePointsSettingDTO): Promise<string> {
    const { CustomPoints, Selection, Display, ValueGiven, ActiveStatus, Plant } = updatePoints;

    const existingPoints = await this.PointsRepo.findOne({
      where: {
        CustomPoints: CustomPoints,
        ActiveStatus: ActiveStatus,
      },
    });

    if (!existingPoints) {
      const newPoints = this.PointsRepo.create({
        CustomPoints: CustomPoints,
        Selection: Selection,
        Display: Display,
        ValueGiven: ValueGiven,
        ActiveStatus: ActiveStatus,
        Plant: Plant,
      });
      await this.PointsRepo.save(newPoints);
    }
    else {
      return "Data Already Exist";
    }
  }

  async updateByCondition(points: number, updateData: UpdatePointsSettingDTO): Promise<PointsSettingEntity[]> {
    const pointsToUpdate = await this.PointsRepo.find({
      where: {
        PointsID: points,
      },
    });

    //Perform the update operation on each retrieved company
    for (const points of pointsToUpdate) {
      //Update the properties of the company based on the updateData
      points.CustomPoints = updateData.CustomPoints;
      points.Selection = updateData.Selection;
      points.Display = updateData.Display;
      points.ValueGiven = updateData.ValueGiven;

      //Save the updated company back to the database
      await this.PointsRepo.save(points);
    }
    return pointsToUpdate;
  }

  async deleteByCondition(IDs: number): Promise<PointsSettingEntity[]> {
    const pointsToDelete = await this.PointsRepo.find({
      where: {
        PointsID: IDs,
        ActiveStatus: 1
      },
    });
    for (const points of pointsToDelete) {
      points.ActiveStatus = 0;
      await this.PointsRepo.save(points);
    }
    return pointsToDelete;
  }

}
