import { Controller, Body, Patch, Get, Param } from '@nestjs/common';
import { ShiftDetailsService } from './shift-details.service';
import { ShiftEntity } from './shift-details.entity';
import { UpdateShiftDTO } from './dto/update-shift-details.dto';

@Controller('shift-details')
export class ShiftDetailsController {
  constructor(
    private readonly ShiftService: ShiftDetailsService
  ) { }

  @Get('getConditionalShift/:plant')
  async getConditionalShift(
    @Param('plant') plant: string,
  ): Promise<ShiftEntity[]> {
    return this.ShiftService.findByCondition(plant);
  }

  @Patch('updateEmployee/:shiftID/:plant')
  async updateEmployee(
    @Param('shiftID') shiftID: number,
    @Param('plant') plant: string,
    @Body() UpdateShift: UpdateShiftDTO,
  ): Promise<ShiftEntity[]> {
    return this.ShiftService.updateByCondition(shiftID, plant, UpdateShift);
  }

  @Patch('StatusChange/:shiftID/:plant:/status')
  async updateStatus(
    @Param('shiftID') shiftID: number,
    @Param('plant') plant: string,
    @Param('status') status: number
  ): Promise<ShiftEntity[]> {
    return this.ShiftService.ChangeStatus(shiftID, plant, status);
  }
}
