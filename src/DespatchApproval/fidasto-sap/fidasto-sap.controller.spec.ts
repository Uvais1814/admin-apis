import { Test, TestingModule } from '@nestjs/testing';
import { FidastoSapController } from './fidasto-sap.controller';

describe('FidastoSapController', () => {
  let controller: FidastoSapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FidastoSapController],
    }).compile();

    controller = module.get<FidastoSapController>(FidastoSapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
