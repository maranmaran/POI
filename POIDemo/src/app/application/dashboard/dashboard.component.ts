import { Component, OnInit } from "@angular/core";
import { LocationService } from "../../../business/services/location.service";
import { Location } from "./../../../business/models/location.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [LocationService]
})
export class DashboardComponent implements OnInit {
  constructor(private locationService: LocationService) {}

  currentLocation: Location;
  ngOnInit() {
    this.currentLocation = this.locationService.getCurrentLocation();
  }
}
