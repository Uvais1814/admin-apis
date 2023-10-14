import { Test, TestingModule } from '@nestjs/testing';
import { TransFidasToSapController } from './trans-fidas-to-sap.controller';

describe('TransFidasToSapController', () => {
  let controller: TransFidasToSapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransFidasToSapController],
    }).compile();

    controller = module.get<TransFidasToSapController>(TransFidasToSapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
