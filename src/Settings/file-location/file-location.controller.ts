import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { FileLocationService } from './file-location.service';
import { FileLocationEntity } from './file-location.entity';
import { FileLocationDTO } from './dto/file-location.dto';

@Controller('file-location')
export class FileLocationController {
  constructor(
    private readonly FileService: FileLocationService
  ) { }

  @Get('getFileLocation')
  async getFileLocation(): Promise<FileLocationEntity[]> {
    return this.FileService.getByCondition();
  }

  @Post('/save')
  async createFileLocation(@Body() updateFile: FileLocationDTO): Promise<void> {
    return this.FileService.createByCondition(updateFile);
  }
}
