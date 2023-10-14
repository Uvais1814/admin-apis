import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftEntity } from './shift-details.entity';
import { UpdateShiftDTO } from './dto/update-shift-details.dto';
import { CreateShiftDTO } from './dto/create-shift-details.dto';

@Injectable()
export class ShiftDetailsService {
  constructor(
    @InjectRepository(ShiftEntity)
    private readonly ShiftRepo: Repository<ShiftEntity>,
  ) { }

  async findByCondition(plant: string): Promise<ShiftEntity[]> {
    return this.ShiftRepo.find({
      where: {
        Plant: plant,
      },
    });
  }

  async updateByCondition(shiftID: number, plant: string, updateData: UpdateShiftDTO): Promise<ShiftEntity[]> {
    const shiftsToUpdate = await this.ShiftRepo.find({
      where: {
        ShiftID: shiftID,
        Plant: plant,
      },
    });

    //Perform the update operation on each retrieved company
    for (const shift of shiftsToUpdate) {
      //Update the properties of the company based on the updateData
      shift.Department = updateData.Department;
      shift.ShiftName = updateData.ShiftName;
      shift.StartTime = updateData.StartTime;
      shift.EndTime = updateData.EndTime;
      shift.ActiveStatus = updateData.ActiveStatus;

      //Save the updated company back to the database
      await this.ShiftRepo.save(shift);
    }
    return shiftsToUpdate;
  }
  async ChangeStatus(ID: number, pl: string, activestatus: number): Promise<ShiftEntity[]> {
    const ShiftsToChange = await this.ShiftRepo.find({
      where: {
        ShiftID: ID,
        Plant: pl,
      },
    });
    for (const shift of ShiftsToChange) {
      shift.ActiveStatus = activestatus;
      await this.ShiftRepo.save(shift);
    }
    return ShiftsToChange;
  }
}
