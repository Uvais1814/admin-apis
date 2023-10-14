import { Test, TestingModule } from '@nestjs/testing';
import { DefectdeptController } from './defectdept.controller';

describe('DefectdeptController', () => {
  let controller: DefectdeptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefectdeptController],
    }).compile();

    controller = module.get<DefectdeptController>(DefectdeptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
