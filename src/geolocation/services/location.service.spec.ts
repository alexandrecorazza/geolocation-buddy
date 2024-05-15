import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService],
    }).compile();

    locationService = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(locationService).toBeDefined();
  });
});
