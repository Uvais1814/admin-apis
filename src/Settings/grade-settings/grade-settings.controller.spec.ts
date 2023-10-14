import { Test, TestingModule } from '@nestjs/testing';
import { GradeSettingsController } from './grade-settings.controller';

describe('GradeSettingsController', () => {
  let controller: GradeSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeSettingsController],
    }).compile();

    controller = module.get<GradeSettingsController>(GradeSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
