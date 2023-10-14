import { Test, TestingModule } from '@nestjs/testing';
import { InspSettingsService } from './insp-settings.service';

describe('InspSettingsService', () => {
  let service: InspSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspSettingsService],
    }).compile();

    service = module.get<InspSettingsService>(InspSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
