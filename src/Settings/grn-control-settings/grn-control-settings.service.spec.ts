import { Test, TestingModule } from '@nestjs/testing';
import { GrnControlSettingsService } from './grn-control-settings.service';

describe('GrnControlSettingsService', () => {
  let service: GrnControlSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrnControlSettingsService],
    }).compile();

    service = module.get<GrnControlSettingsService>(GrnControlSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
