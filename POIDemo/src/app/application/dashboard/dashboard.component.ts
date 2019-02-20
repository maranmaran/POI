import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { LocationService } from "../../../business/services/location.service";
import { Location } from "./../../../business/models/location.model";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { FormGroup, FormControl } from "@angular/forms";
import { MapsAPILoader, AgmMarker } from "@agm/core";
import { Marker, InfoWindow } from "@agm/core/services/google-maps-types";
import { map } from 'rxjs/operators';
declare let google: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [LocationService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private locationService: LocationService
  ) { }

  map: any;

  currentAddress: Address;
  cLat: number;
  cLng: number;

  places: Address[] = [];

  ngOnInit() {
    this.mapsAPILoader.load();

    this.locationService.placesEmitter.subscribe(
      (places: Address[]) => this.places = places,
      err => console.log(err)
    )
  }

  mapReady($event: any) {
    this.map = $event;
    this.initAddress();
  }

  initAddress() {
    this.locationService.getCurrentLocation(this.map);
    this.locationService.currentAddressEventEmitter
      .subscribe(
        (currentAddress: Address) => {
          console.log(currentAddress);
          this.currentAddress = currentAddress;
          this.cLat = currentAddress.geometry.location.lat();
          this.cLng = currentAddress.geometry.location.lng();

          this.getPlacesInRadius();
        },
        err => console.log(err));
  }

  handleAddressChange(currentAddress: Address) {
    this.currentAddress = currentAddress;
    this.cLat = currentAddress.geometry.location.lat();
    this.cLng = currentAddress.geometry.location.lng();

    this.getPlacesInRadius();
  }

  getPlacesInRadius() {
    this.locationService.getPointsOfInterest(this.map, { lat: this.cLat, lng: this.cLng });
  }

  onInteractWithMarker(infoWindow: InfoWindow, map: any) {
    if (map.lastOpen != null) {
      map.lastOpen.close();
    }

    map.lastOpen = infoWindow;
    infoWindow.open();
  }

  onSelectedPlace(place: Address) {
    console.log(place);
    var marker = document.getElementById(place.id);
    console.log(marker);
  }

  ngOnDestroy(): void {
    this.locationService.placesEmitter.unsubscribe();
  }
}
