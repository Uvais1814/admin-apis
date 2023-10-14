import { Module } from '@nestjs/common';
import { LoomController } from './loom.controller';
import { LoomService } from './loom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoomEntity } from './loom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoomEntity])],
  controllers: [LoomController],
  providers: [LoomService]
})
export class LoomModule { }
