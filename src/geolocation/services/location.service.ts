import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
import { GetLocationByNearbyDto } from '../dto/get-location-by-nearby.dto';
import { Geolocation } from '../schemas/geolocation.schema';
import { LocationStatusType } from '../types/LocationStatusType';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Geolocation.name)
    private readonly geolocationModel: Model<Geolocation>,
  ) {}

  filterLocationByNearby(
    getLocationByNearbyDto: GetLocationByNearbyDto,
    locations: Geolocation[],
  ): Geolocation[] {
    const { coordinates, mts } = getLocationByNearbyDto;
    return locations.filter(
      (location) =>
        Math.abs(location.coordinates.x - coordinates.x) <= mts &&
        Math.abs(location.coordinates.y - coordinates.y) <= mts,
    );
  }

  locationByNearbyStatus(
    getLocationByNearbyDto: GetLocationByNearbyDto,
    locationByNearby: Geolocation[],
  ): LocationStatusType[] {
    return locationByNearby.map((location) => {
      const status =
        getLocationByNearbyDto.time <= location.closed || location.closed === ''
          ? 'opened'
          : 'closed';
      return { [location.description]: status };
    });
  }

  async findAllLocations(): Promise<Geolocation[]> {
    return this.geolocationModel.find().exec();
  }

  async findByNearby(
    getLocationByNearbyDto: GetLocationByNearbyDto,
  ): Promise<LocationStatusType[]> {
    const locations = await this.geolocationModel.find().exec();
    const locationByNearby = this.filterLocationByNearby(
      getLocationByNearbyDto,
      locations,
    );
    return this.locationByNearbyStatus(
      getLocationByNearbyDto,
      locationByNearby,
    );
  }

  async create(createLocationDto: CreateLocationDto): Promise<Geolocation> {
    return await this.geolocationModel.create(createLocationDto);
  }
}
