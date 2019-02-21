import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { LocationService } from '../../../business/services/location.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapsAPILoader } from '@agm/core';
import {  InfoWindow } from '@agm/core/services/google-maps-types';
import { SidenavService } from 'src/business/services/sidenav.service';
import { HtmlParser } from '@angular/compiler';
import { element } from 'protractor';
import { MatSidenav } from '@angular/material';
import { map } from 'rxjs/operators';
declare let google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private locationService: LocationService,
    private sidenavService: SidenavService
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
    );

    this.locationService.typesChange.subscribe(
      () => this.getPlacesInRadius(),
      err => console.log(err)
    );
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

    // flush on address change
    // Bug: Repro steps -> remove below line and do next steps
    // when hovering init address markers everything is fine
    // change address and try to hover -> observe console
    this.previousInfoWindow = null;

    this.getPlacesInRadius();
  }

  getPlacesInRadius() {
    this.locationService.getPointsOfInterest(this.map, { lat: this.cLat, lng: this.cLng });
  }

  // tslint:disable-next-line:member-ordering
  previousInfoWindow: InfoWindow;
  onInteractWithMarker(infowindow: InfoWindow) {
    if (this.previousInfoWindow) {
      this.previousInfoWindow.close();
    }

    this.previousInfoWindow = infowindow;
    infowindow.open();
  }

  onSelectedPlace(place: Address) {
    // mimic click event since I don't know how to access directive reference and open infowindow
    const infoWindowHttpElement = document.getElementById(place.id);
    infoWindowHttpElement.click();
  }

  toggleSideNav() {
    this.sidenavService.toggle();
  }

  ngOnDestroy(): void {
    this.locationService.placesEmitter.unsubscribe();
    this.locationService.typesChange.unsubscribe();
    this.locationService.currentAddressEventEmitter.unsubscribe();
  }
}
