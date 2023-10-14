import { Module } from '@nestjs/common';
import { MasterApiController } from './master-api.controller';
import { MasterApiService } from './master-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterAPIEntity } from './master-api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterAPIEntity])],
  controllers: [MasterApiController],
  providers: [MasterApiService]
})
export class MasterApiModule { }
