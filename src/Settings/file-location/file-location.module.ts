import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileLocationController } from './file-location.controller';
import { FileLocationService } from './file-location.service';
import { FileLocationEntity } from './file-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileLocationEntity])],
  controllers: [FileLocationController],
  providers: [FileLocationService]
})
export class FileLocationModule { }
