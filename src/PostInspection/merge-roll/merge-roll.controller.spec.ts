import { Test, TestingModule } from '@nestjs/testing';
import { MergeRollController } from './merge-roll.controller';

describe('MergeRollController', () => {
  let controller: MergeRollController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MergeRollController],
    }).compile();

    controller = module.get<MergeRollController>(MergeRollController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
