import { Test, TestingModule } from '@nestjs/testing';
import { ManualGrnController } from './manual-grn.controller';

describe('ManualGrnController', () => {
  let controller: ManualGrnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManualGrnController],
    }).compile();

    controller = module.get<ManualGrnController>(ManualGrnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
