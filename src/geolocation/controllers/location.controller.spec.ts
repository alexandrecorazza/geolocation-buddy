import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from '../services/location.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { Geolocation } from '../schemas/geolocation.schema';
import { GetLocationByNearbyDto } from '../dto/get-location-by-nearby.dto';
import { LocationStatusType } from '../types/LocationStatusType';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  const fakeLocations: Geolocation[] = [
    {
      description: 'DESCRIPTION-1',
      opened: '09:00',
      closed: '18:00',
      coordinates: {
        x: 10,
        y: 20,
      },
    },
    {
      description: 'DESCRIPTION-2',
      opened: '10:00',
      closed: '22:00',
      coordinates: {
        x: 15,
        y: 30,
      },
    },
    {
      description: 'DESCRIPTION-3',
      opened: '',
      closed: '',
      coordinates: {
        x: 25,
        y: 12,
      },
    },
  ];

  const fakeLocationByNearbyStatus: LocationStatusType[] = [
    {
      'DESCRIPTION-1': 'closed',
    },
    {
      'DESCRIPTION-3': 'closed',
    },
  ];

  const createLocationDto: CreateLocationDto = {
    description: 'NEW-LOCATION',
    opened: '09:00',
    closed: '21:00',
    coordinates: {
      x: 20,
      y: 30,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: {
            findAllLocations: jest.fn().mockResolvedValue(fakeLocations),
            findByNearby: jest
              .fn()
              .mockResolvedValue(fakeLocationByNearbyStatus),
            create: jest.fn().mockResolvedValue(createLocationDto),
          },
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should return all locations', async () => {
    const locations = await controller.findAllLocations();

    expect(locations).toEqual(fakeLocations);
    expect(locations[0]).toEqual(fakeLocations[0]);
    expect(service.findAllLocations).toHaveBeenCalledTimes(1);
  });

  it('should return locations by nearby given a user input', async () => {
    const fakeInputLocation: GetLocationByNearbyDto = {
      coordinates: {
        x: 20,
        y: 10,
      },
      mts: 10,
      time: '19:00',
    };

    const locationsByNearby = await controller.findByNearby(fakeInputLocation);

    expect(locationsByNearby).toEqual(fakeLocationByNearbyStatus);
    expect(service.findByNearby).toHaveBeenCalledWith(fakeInputLocation);
  });

  it('should create a new location', async () => {
    const createdLocation = await controller.create(fakeLocations[1]);

    expect(createdLocation).toEqual(createLocationDto);
    expect(createdLocation.description).toEqual(createLocationDto.description);
    expect(service.create).toHaveBeenCalledWith(fakeLocations[1]);
  });
});
