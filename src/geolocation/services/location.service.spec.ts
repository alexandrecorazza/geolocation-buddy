import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { LocationService } from './location.service';
import { Geolocation } from '../schemas/geolocation.schema';
import { GetLocationByNearbyDto } from '../dto/get-location-by-nearby.dto';
import { LocationStatusType } from '../types/LocationStatusType';

describe('LocationService', () => {
  let service: LocationService;
  let model: Model<Geolocation>;

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

  const fakeInputLocation: GetLocationByNearbyDto = {
    coordinates: {
      x: 20,
      y: 10,
    },
    mts: 10,
    time: '19:00',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getModelToken('Geolocation'),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    model = module.get<Model<Geolocation>>(getModelToken('Geolocation'));
  });

  it('should return all locations', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockReturnValueOnce(fakeLocations),
    } as any);
    const locations = await service.findAllLocations();
    expect(locations).toEqual(fakeLocations);
  });

  it('should return locations by nearby', async () => {
    const fakeLocationByNearbyStatus: LocationStatusType[] = [
      {
        'DESCRIPTION-1': 'closed',
      },
      {
        'DESCRIPTION-3': 'opened',
      },
    ];

    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockReturnValueOnce(fakeLocations),
    } as any);
    const locations = await service.findByNearby(fakeInputLocation);
    expect(locations).toEqual(fakeLocationByNearbyStatus);
  });

  it('should create a new location', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(fakeLocations[0] as any));

    const createdLocation = await service.create(fakeLocations[0]);

    expect(createdLocation).toEqual(fakeLocations[0]);
    expect(createdLocation.description).toEqual(fakeLocations[0].description);
  });

  it('should filter locations by nearby', () => {
    const fakeFilterLocationByNearby = [
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
        description: 'DESCRIPTION-3',
        opened: '',
        closed: '',
        coordinates: {
          x: 25,
          y: 12,
        },
      },
    ];

    const locationByNearby = service.filterLocationByNearby(
      fakeInputLocation,
      fakeLocations,
    );

    expect(locationByNearby).toEqual(fakeFilterLocationByNearby);
    expect(locationByNearby[0].description).toEqual(
      fakeFilterLocationByNearby[0].description,
    );
  });

  it('should return status of location by nearby', () => {
    const fakeLocationByNearbyStatus: LocationStatusType[] = [
      { 'DESCRIPTION-1': 'closed' },
      { 'DESCRIPTION-2': 'opened' },
      { 'DESCRIPTION-3': 'opened' },
    ];

    const locationByNearby = service.locationByNearbyStatus(
      fakeInputLocation,
      fakeLocations,
    );

    expect(locationByNearby).toEqual(fakeLocationByNearbyStatus);
    expect(locationByNearby[1]['DESCRIPTION-2']).toEqual('opened');
  });
});
