import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatCheckboxChange } from '@angular/material';
import { SidenavService } from 'src/business/services/sidenav.service';
import { AgmLocationTypes } from 'src/business/misc/agm-location-types.constant';
import { Subject } from 'rxjs';
import { LocationService } from '../business/services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'points of interest demo project';
  @ViewChild(MatSidenav) public sidenav: MatSidenav;
  types = AgmLocationTypes;

  constructor(
    private sidenavService: SidenavService,
    private locationService: LocationService) {}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  onCheck(checkboxChange: MatCheckboxChange, type: { type: string, enabled: boolean }) {
      AgmLocationTypes.find(x => x.type === type.type).enabled = checkboxChange.checked;
  }

  onClose() {
    this.locationService.typesChange.emit();
  }
}
