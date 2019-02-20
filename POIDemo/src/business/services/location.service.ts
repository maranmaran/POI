import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { Address } from "ngx-google-places-autocomplete/objects/address";
declare let google: any;

@Injectable()
export class LocationService {
  startingPlaceId = "ChIJOcwCyZLWZUcRisL7KJYkRTo";
  typesToSearch = ["bakery", "cafe", "store"];
  radius = 1000;

  currentAddressEventEmitter = new EventEmitter<Address>();
  placesEmitter = new EventEmitter<Address[]>();

  getCurrentLocation(map: any) {
    // contact api for actual location of user for now use starting location
    const service = new google.maps.places.PlacesService(map);

    return service.getDetails(
      {
        placeId: this.startingPlaceId
      },
      placeResult => {
        this.currentAddressEventEmitter.emit(placeResult);
      }
    );
  }

  getPointsOfInterest(map: any, location: any): any {
    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: location,
        radius: this.radius, // meters,
        types: this.typesToSearch
      },
      (places: Address[]) => {
        this.placesEmitter.emit(places);
      }
    );
  }
}
