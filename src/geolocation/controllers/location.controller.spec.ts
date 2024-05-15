import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';

describe('LocationController', () => {
  let locationController: LocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
    }).compile();

    locationController = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(locationController).toBeDefined();
  });
});
