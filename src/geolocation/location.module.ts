import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './services/location.service';
import { LocationController } from './controllers/location.controller';
import { Geolocation, GeolocationSchema } from './schemas/geolocation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Geolocation.name, schema: GeolocationSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
