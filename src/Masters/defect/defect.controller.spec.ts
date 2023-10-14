import { Test, TestingModule } from '@nestjs/testing';
import { DefectController } from './defect.controller';

describe('DefectController', () => {
  let controller: DefectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefectController],
    }).compile();

    controller = module.get<DefectController>(DefectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
