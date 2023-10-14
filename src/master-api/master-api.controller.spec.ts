import { Test, TestingModule } from '@nestjs/testing';
import { MasterApiController } from './master-api.controller';

describe('MasterApiController', () => {
  let controller: MasterApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterApiController],
    }).compile();

    controller = module.get<MasterApiController>(MasterApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
