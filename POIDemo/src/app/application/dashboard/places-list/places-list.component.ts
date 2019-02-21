import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { LocationService } from '../../../../business/services/location.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {
  places: Address[] = [];
  displayedColumns: string[] = ['name', 'type'];
  pageSize = 12;
  dataSource: MatTableDataSource<Address>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() selectedPlace = new EventEmitter<Address>();

  constructor(public locationService: LocationService) { }

  ngOnInit(): void {

    this.locationService.placesEmitter.subscribe(
      (places: Address[]) => {
        this.places = places;

        this.dataSource = new MatTableDataSource(places);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.locationService.isLoading = false;

        // filter
        this.dataSource.filterPredicate = (data, filterValue) =>
          data.name
            .trim()
            .toLowerCase()
            .indexOf(filterValue.trim().toLowerCase()) !== -1 ||
          data.types
            .join(', ')
            .trim()
            .toLowerCase()
            .indexOf(filterValue.trim().toLowerCase()) !== -1;
      },
      err => console.log(err)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatOutput(types: string[]) {
    const output = types.join(', ');
    return output.trim();
  }

  onHover(place: Address) {
    this.selectedPlace.emit(place);
  }
}
