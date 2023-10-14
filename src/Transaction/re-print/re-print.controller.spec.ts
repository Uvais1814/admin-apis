import { Test, TestingModule } from '@nestjs/testing';
import { RePrintController } from './re-print.controller';

describe('RePrintController', () => {
  let controller: RePrintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RePrintController],
    }).compile();

    controller = module.get<RePrintController>(RePrintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
