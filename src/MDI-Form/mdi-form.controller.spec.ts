import { Test, TestingModule } from '@nestjs/testing';
import { MDIController } from './mdi-form.controller';

describe('MdiController', () => {
  let controller: MDIController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MDIController],
    }).compile();

    controller = module.get<MDIController>(MDIController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
