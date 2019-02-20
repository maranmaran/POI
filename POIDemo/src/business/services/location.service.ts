import { Injectable } from "@angular/core";
import { Location } from "./../models/location.model";

@Injectable()
export class LocationService {
  getCurrentLocation(): Location {
    //http call

    return new Location(51.678418, 7.809007);
  }
}
