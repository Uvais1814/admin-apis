import { Test, TestingModule } from '@nestjs/testing';
import { JumboBatchController } from './jumbo-batch.controller';

describe('JumboBatchController', () => {
  let controller: JumboBatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JumboBatchController],
    }).compile();

    controller = module.get<JumboBatchController>(JumboBatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
