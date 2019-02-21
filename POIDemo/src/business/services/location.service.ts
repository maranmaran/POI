import { Injectable, EventEmitter } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AgmLocationTypes } from '../misc/agm-location-types.constant';
declare let google: any;

@Injectable()
export class LocationService {
  startingPlaceId = 'ChIJOcwCyZLWZUcRisL7KJYkRTo';
  radius = 1000;

  currentAddressEventEmitter = new EventEmitter<Address>();
  placesEmitter = new EventEmitter<Address[]>();
  typesChange = new EventEmitter<void>();
  isLoading = true;

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

  // tslint:disable-next-line:member-ordering
  placesTemp: Address[];
  getPointsOfInterest(map: any, location: any): any {
    const service = new google.maps.places.PlacesService(map);

    this.isLoading = true;
    this.placesTemp = [];
    AgmLocationTypes.forEach(typeObject => {
      if (typeObject.enabled) {
        service.nearbySearch(
          {
            location,
            radius: this.radius, // meters,
            type: typeObject.type
          },
          (places: Address[]) => {
            if (places != null && places.length > 0) {
              this.placesTemp = this.placesTemp.concat(places);
              this.placesEmitter.emit(this.placesTemp);
            }
          }
        );
      }
    });

    if (this.placesTemp.length === 0) {
      this.placesEmitter.emit(this.placesTemp);
    }
  }
}
