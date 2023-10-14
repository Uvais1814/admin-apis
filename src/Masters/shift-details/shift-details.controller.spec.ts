import { Test, TestingModule } from '@nestjs/testing';
import { ShiftDetailsController } from './shift-details.controller';

describe('ShiftDetailsController', () => {
  let controller: ShiftDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftDetailsController],
    }).compile();

    controller = module.get<ShiftDetailsController>(ShiftDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
