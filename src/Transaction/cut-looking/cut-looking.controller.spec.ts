import { Test, TestingModule } from '@nestjs/testing';
import { CutLookingController } from './cut-looking.controller';

describe('CutLookingController', () => {
  let controller: CutLookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CutLookingController],
    }).compile();

    controller = module.get<CutLookingController>(CutLookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
