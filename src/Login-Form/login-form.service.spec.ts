import { Test, TestingModule } from '@nestjs/testing';
import { LoginFormService } from './login-form.service';

describe('LoginFormService', () => {
  let service: LoginFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginFormService],
    }).compile();

    service = module.get<LoginFormService>(LoginFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
