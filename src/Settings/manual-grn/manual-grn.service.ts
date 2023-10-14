import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManualGrnEntity } from './manual-grn.entity';
import { ManualGRNDTO } from './dto/maual-grn.dto';


@Injectable()
export class ManualGrnService {
  constructor(
    @InjectRepository(ManualGrnEntity)
    private readonly ManualRepo: Repository<ManualGrnEntity>,
  ) { }

  async getByCondition(status: number): Promise<ManualGrnEntity[]> {
    return this.ManualRepo.find({
      where: {
        activestatus: status,
      },
    });
  }

  async updateByCondition(field: string, status: number, updateData: ManualGRNDTO): Promise<ManualGrnEntity[]> {
    const ManualGRNToUpdate = await this.ManualRepo.find({
      where: {
        standardfields: field,
        activestatus: status,
      },
    });
    for (const grn of ManualGRNToUpdate) {
      // grn.standardfields = updateData.standardfields,
      grn.customizedfields = updateData.customizedfields,
        // grn.defaultvalue = updateData.defaultvalue,

        await this.ManualRepo.save(grn);
    }
    return ManualGRNToUpdate;
  }

  async DeleteByCondition(field: string): Promise<ManualGrnEntity[]> {
    const ManualGRNToUpdate = await this.ManualRepo.find({
      where: {
        standardfields: field,
        activestatus: 1,
      },
    });
    for (const grn of ManualGRNToUpdate) {
      grn.customizedfields = null
      await this.ManualRepo.save(grn);
    }
    return ManualGRNToUpdate;
  }
}
