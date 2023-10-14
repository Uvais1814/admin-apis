import { Test, TestingModule } from '@nestjs/testing';
import { CompletedController } from './completed.controller';

describe('CompletedController', () => {
  let controller: CompletedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletedController],
    }).compile();

    controller = module.get<CompletedController>(CompletedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
