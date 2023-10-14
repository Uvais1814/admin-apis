import { Test, TestingModule } from '@nestjs/testing';
import { PointsSettingService } from './points-setting.service';

describe('PointsSettingService', () => {
  let service: PointsSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsSettingService],
    }).compile();

    service = module.get<PointsSettingService>(PointsSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
