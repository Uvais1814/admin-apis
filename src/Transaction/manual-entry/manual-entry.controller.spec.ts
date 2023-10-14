import { Test, TestingModule } from '@nestjs/testing';
import { ManualEntryController } from './manual-entry.controller';

describe('ManualEntryController', () => {
  let controller: ManualEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManualEntryController],
    }).compile();

    controller = module.get<ManualEntryController>(ManualEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
