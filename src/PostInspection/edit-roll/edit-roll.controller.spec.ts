import { Test, TestingModule } from '@nestjs/testing';
import { EditRollController } from './edit-roll.controller';

describe('EditRollController', () => {
  let controller: EditRollController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditRollController],
    }).compile();

    controller = module.get<EditRollController>(EditRollController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
