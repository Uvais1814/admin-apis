import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { MasterAPIEntity } from './master-api.entity';
import { Repository, Connection } from 'typeorm';


@Injectable()
export class MasterApiService {
  constructor(
    @InjectRepository(MasterAPIEntity)
    private readonly mastAPIRepository: Repository<MasterAPIEntity>,
    @InjectConnection() private connection: Connection
  ) { }

  async getHostName(): Promise<string> {
    const result = await this.mastAPIRepository.find({
      select: ['Host'],
      take: 1
    });
    return result[0].Host;
  }

  async getHostAddress(FormName: string, API: string): Promise<string> {
    const result = await this.mastAPIRepository.find({
      select: ['Address'],
      where: {
        Forms: FormName,
        API_No: API,
      },
      take: 1
    });
    return result[0].Address;
  }

  async getDate(): Promise<string> {
    const query = 'SELECT NOW() as currentDate';
    const result = await this.connection.query(query);

    return result[0].currentDate;
  }
}
