import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InspectionMachineEntity } from './inspection-machine.entity';
import { CreateMachineDTO } from './dto/create-inspection-machine.dto';
import { UpdateMachineDTO } from './dto/update-inspection-machine.dto';
import { InspectionShedEntity } from '../inspection-shed/inspection-shed.entity';

@Injectable()
export class InspectionMachineService {
  constructor(
    @InjectRepository(InspectionMachineEntity)
    private readonly MachineRepo: Repository<InspectionMachineEntity>,
    @InjectRepository(InspectionShedEntity)
    private readonly ShedRepo: Repository<InspectionShedEntity>
  ) { }

  async findByCondition(status: number, plant: string): Promise<InspectionMachineEntity[]> {
    return this.MachineRepo.find({
      where: {
        ActiveStatus: status,
        Plant: plant,
      },
    });
  }

  // async getInspShed(plantno: string): Promise<InspectionShedEntity[]> {
  //   const query = `
  //   SELECT InspectionShedID, InspectionShedName
  //   FROM MastInspectionShed
  //   WHERE ActiveStatus='1'
  //   AND Plant='${plantno}'
  //   `;
  //   return this.ShedRepo.query(query);
  // }

  async getInspShed(plantno: string): Promise<InspectionShedEntity[]>{
    return this.ShedRepo.find({
      select:['InspectionShedID','InspectionShedName'],
      where:{
        ActiveStatus: 1,
        Plant: plantno,
      }
    });
  }

  async getJoinValues(plant: string): Promise<any[]> {
    return this.MachineRepo
      .createQueryBuilder('MM')
      .select('InspectionMachineID, I.InspectionShedName, InspectionType, InspectionMachineCode, InspectionMachineName, MachineType')
      .innerJoin('MastInspectionShed', 'I', 'MM.InspectionShedID = I.InspectionShedID')
      .where('MM.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('MM.Plant =:plants', { plants: plant })
      .getRawMany();
  }

  async createByCondition(createInspMachine: CreateMachineDTO): Promise<void> {
    const { InspectionShedID, InspectionType, InspectionMachineCode, InspectionMachineName, Date, Plant, MachineType } = createInspMachine;

    const existingMachine = await this.MachineRepo.findOne({
      where: {
        InspectionMachineCode: InspectionMachineCode,
        ActiveStatus: 1,
        Plant: Plant,
      },
    });

    if (!existingMachine) {
      const newMachine = this.MachineRepo.create({
        InspectionShedID: InspectionShedID,
        InspectionType: InspectionType,
        InspectionMachineCode: InspectionMachineCode,
        InspectionMachineName: InspectionMachineName,
        Date: Date,
        Plant: Plant,
        MachineType: MachineType,
      });
      await this.MachineRepo.save(newMachine);
    }
  }

  async updateByCondition(machineID: number, plant: string, updateData: UpdateMachineDTO): Promise<InspectionMachineEntity[]> {
    const machinesToUpdate = await this.MachineRepo.find({
      where: {
        InspectionMachineID: machineID,
        Plant: plant,
      },
    });

    //Perform the update operation on each retrieved company
    for (const machine of machinesToUpdate) {
      //Update the properties of the company based on the updateData
      machine.InspectionMachineCode = updateData.InspectionMachineCode;
      machine.InspectionType = updateData.InspectionType;
      machine.InspectionMachineName = updateData.InspectionMachineName;
      machine.MachineType = updateData.MachineType;

      //Save the updated company back to the database
      await this.MachineRepo.save(machine);
    }
    return machinesToUpdate;
  }

  async deleteByCondition(ID: number, pl: string, activestatus: number): Promise<InspectionMachineEntity[]> {
    const machinesToDelete = await this.MachineRepo.find({
      where: {
        InspectionMachineID: ID,
        Plant: pl,
      },
    });

    // Perform the deletion operation on each retrieved company
    for (const machine of machinesToDelete) {
      // Perform any necessary deletion logic, such as setting the 'activestatus' to a specific value
      machine.ActiveStatus = activestatus;

      // Save the updated company back to the database or delete it using the appropriate method
      await this.MachineRepo.save(machine); // Or use the appropriate delete method
    }

    return machinesToDelete;
  }
}
