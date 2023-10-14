import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeGradeEntity } from './change-grade.entity';
import { CreateChangeGradeDTO } from './dto/create-change-grade.dto';
import { UpdateChangeGradeDTO } from './dto/update-change-grade.dto';

@Injectable()
export class ChangeGradeService {
  constructor(
    @InjectRepository(ChangeGradeEntity)
    private readonly ChangeGradeRepo: Repository<ChangeGradeEntity>,
  ) { }

  async findByCondition(plant: string): Promise<ChangeGradeEntity[]> {
    return this.ChangeGradeRepo.find({
      where: {
        ActiveStatus: 1,
        Plant: plant,
      },
    });
  }

  async createByCondition(createChangeGrade: CreateChangeGradeDTO): Promise<void> {
    const { UserGrade, ActiveStatus, Plant } = createChangeGrade;

    const existingChangeGrade = await this.ChangeGradeRepo.findOne({
      where: {
        UserGrade: UserGrade,
        ActiveStatus: 1,
        Plant: Plant,
      },
    });

    if (!existingChangeGrade) {
      const newChangeGrade = this.ChangeGradeRepo.create({
        UserGrade: UserGrade,
        ActiveStatus: ActiveStatus,
        Plant: Plant,
      });
      await this.ChangeGradeRepo.save(newChangeGrade);
    }
  }
  async updateByCondition(grade: string, plant: string, updateData: UpdateChangeGradeDTO): Promise<ChangeGradeEntity[]> {
    const changegradesToUpdate = await this.ChangeGradeRepo.find({
      where: {
        UserGrade: grade,
        Plant: plant,
      },
    });

    //Perform the update operation on each retrieved company
    for (const changegrade of changegradesToUpdate) {
      //Update the properties of the company based on the updateData
      changegrade.UserGrade = updateData.UserGrade;

      //Save the updated company back to the database
      await this.ChangeGradeRepo.save(changegrade);
    }
    return changegradesToUpdate;
  }

  async deleteByCondition(IDz: string, pl: string, activestatus: number): Promise<ChangeGradeEntity[]> {
    const changegradesToDelete = await this.ChangeGradeRepo.find({
      where: {
        UserGrade: IDz,
        Plant: pl,
      },
    });
    for (const changegrade of changegradesToDelete) {
      changegrade.ActiveStatus = activestatus;
      await this.ChangeGradeRepo.save(changegrade);
    }
    return changegradesToDelete;
  }
}
