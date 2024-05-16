import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { Geolocation } from '../schemas/geolocation.schema';
import { GetLocationByNearbyDto } from '../dto/get-location-by-nearby.dto';
import { LocationStatusType } from '../types/LocationStatusType';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAllLocations(): Promise<Geolocation[]> {
    return this.locationService.findAllLocations();
  }

  @Get('/findByNearby')
  async findByNearby(
    @Query() getLocationByNearby: GetLocationByNearbyDto,
  ): Promise<LocationStatusType[]> {
    return this.locationService.findByNearby(getLocationByNearby);
  }

  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Geolocation> {
    return this.locationService.create(createLocationDto);
  }
}
