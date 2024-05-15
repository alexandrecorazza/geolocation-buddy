import { Controller, Get } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { Geolocation } from '../schemas/geolocation.schema';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAllLocations(): Promise<Geolocation[]> {
    return this.locationService.findAllLocations();
  }
}
