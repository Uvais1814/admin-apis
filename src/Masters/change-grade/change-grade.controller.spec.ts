import { Test, TestingModule } from '@nestjs/testing';
import { ChangeGradeController } from './change-grade.controller';

describe('ChangeGradeController', () => {
  let controller: ChangeGradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangeGradeController],
    }).compile();

    controller = module.get<ChangeGradeController>(ChangeGradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
