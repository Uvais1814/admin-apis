import { Test, TestingModule } from '@nestjs/testing';
import { FileLocationController } from './file-location.controller';

describe('FileLocationController', () => {
  let controller: FileLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileLocationController],
    }).compile();

    controller = module.get<FileLocationController>(FileLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
