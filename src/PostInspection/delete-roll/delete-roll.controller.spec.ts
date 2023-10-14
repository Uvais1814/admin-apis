import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRollController } from './delete-roll.controller';

describe('DeleteRollController', () => {
  let controller: DeleteRollController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteRollController],
    }).compile();

    controller = module.get<DeleteRollController>(DeleteRollController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
