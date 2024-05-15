import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { LocationService } from './location.service';
import { Geolocation } from '../schemas/geolocation.schema';

describe('LocationService', () => {
  let service: LocationService;
  let model: Model<Geolocation>;

  const fakeLocations: Geolocation[] = [
    {
      description: 'DESCRIPTION-1',
      opened: '09:00',
      closed: '18:00',
      coordenates: {
        x: 10,
        y: 20,
      },
    },
    {
      description: 'DESCRIPTION-2',
      opened: '10:00',
      closed: '22:00',
      coordenates: {
        x: 15,
        y: 30,
      },
    },
    {
      description: 'DESCRIPTION-3',
      opened: '',
      closed: '',
      coordenates: {
        x: 25,
        y: 12,
      },
    },
  ];

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

  it('should create a new location', async () => {
    const dummyLocation = fakeLocations[0];

    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(dummyLocation as any));

    const createdLocation = await service.create(dummyLocation);

    expect(createdLocation).toEqual(dummyLocation);
    expect(createdLocation.description).toEqual(dummyLocation.description);
  });
});
