import { Test, TestingModule } from '@nestjs/testing';
import { LoomController } from './loom.controller';

describe('LoomController', () => {
  let controller: LoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoomController],
    }).compile();

    controller = module.get<LoomController>(LoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
