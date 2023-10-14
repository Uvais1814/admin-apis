import { Test, TestingModule } from '@nestjs/testing';
import { StatusChangeController } from './status-change.controller';

describe('StatusChangeController', () => {
  let controller: StatusChangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusChangeController],
    }).compile();

    controller = module.get<StatusChangeController>(StatusChangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
