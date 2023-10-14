import { Test, TestingModule } from '@nestjs/testing';
import { ReInspectionController } from './re-inspection.controller';

describe('ReInspectionController', () => {
  let controller: ReInspectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReInspectionController],
    }).compile();

    controller = module.get<ReInspectionController>(ReInspectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
