import { Test, TestingModule } from '@nestjs/testing';
import { InspSettingsController } from './insp-settings.controller';

describe('InspSettingsController', () => {
  let controller: InspSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspSettingsController],
    }).compile();

    controller = module.get<InspSettingsController>(InspSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
