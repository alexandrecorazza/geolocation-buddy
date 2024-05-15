import { Module } from '@nestjs/common';
import { LocationService } from './services/location.service';
import { LocationController } from './controllers/location.controller';

@Module({
  imports: [],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
