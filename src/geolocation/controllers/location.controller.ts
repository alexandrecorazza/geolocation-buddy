import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { Geolocation } from '../schemas/geolocation.schema';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAllLocations(): Promise<Geolocation[]> {
    return this.locationService.findAllLocations();
  }

  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Geolocation> {
    return this.locationService.create(createLocationDto);
  }
}
