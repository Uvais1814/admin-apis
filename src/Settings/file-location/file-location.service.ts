import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { FileLocationEntity } from './file-location.entity';
import { stat } from 'fs';
import { FileLocationModule } from './file-location.module';
import { FileLocationDTO } from './dto/file-location.dto';
import { error } from 'console';

@Injectable()
export class FileLocationService {
  constructor(
    @InjectRepository(FileLocationEntity)
    private readonly FileRepo: Repository<FileLocationEntity>
  ) { }

  async getByCondition(): Promise<FileLocationEntity[]> {
    return this.FileRepo.find({
      where: {
        ActiveStatus: 1,
      },
    });
  }

  async createByCondition(createFileLocation: FileLocationDTO): Promise<any> {
    const { MastInput, InputFile, OutputFile, ReportFile, AdminServerExe, InspServerExe, InspServerExeFinal, ReportServerExe, AdminInstalledPath, InspInstalledPath, InspInstalledPathFinal, ReportInstalledPath, ActiveStatus } = createFileLocation;

    const existingFile = await this.FileRepo.findOne({
      where: {
        ActiveStatus: ActiveStatus,
      },
    });

    if (existingFile) {
      // If there is an existing row in the table, do not allow inserting a new record
      return { message: 'A record already exists in the table.' };
    }

    const newFileLocation = this.FileRepo.create({
      MastInput: MastInput,
      InputFile: InputFile,
      OutputFile: OutputFile,
      ReportFile: ReportFile,
      AdminServerExe: AdminServerExe,
      InspServerExe: InspServerExe,
      InspServerExeFinal: InspServerExeFinal,
      ReportServerExe: ReportServerExe,
      AdminInstalledPath: AdminInstalledPath,
      InspInstalledPath: InspInstalledPath,
      InspInstalledPathFinal: InspInstalledPathFinal,
      ReportInstalledPath: ReportInstalledPath,
    });

    await this.FileRepo.save(newFileLocation);
  }
}