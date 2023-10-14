import { Test, TestingModule } from '@nestjs/testing';
import { PointsSettingController } from './points-setting.controller';

describe('PointsSettingController', () => {
  let controller: PointsSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsSettingController],
    }).compile();

    controller = module.get<PointsSettingController>(PointsSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
