import { Test, TestingModule } from '@nestjs/testing';
import { ApprovedController } from './approved.controller';

describe('ApprovedController', () => {
  let controller: ApprovedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovedController],
    }).compile();

    controller = module.get<ApprovedController>(ApprovedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
