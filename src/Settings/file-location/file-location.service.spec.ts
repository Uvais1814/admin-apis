import { Test, TestingModule } from '@nestjs/testing';
import { FileLocationService } from './file-location.service';

describe('FileLocationService', () => {
  let service: FileLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileLocationService],
    }).compile();

    service = module.get<FileLocationService>(FileLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
