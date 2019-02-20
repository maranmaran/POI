import { BrowserModule } from "@angular/platform-browser";
import { AppMaterialModule } from "./modules/app-material.module";
import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxPaginationModule } from "ngx-pagination"; // <-- import the module
import { StarRatingModule } from 'angular-star-rating';

import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./handle-pages/error/error.component";
import { DashboardComponent } from "./application/dashboard/dashboard.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PlacesListComponent } from "./application/dashboard/places-list/places-list.component";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    DashboardComponent,
    PlacesListComponent
  ],
  imports: [
    GooglePlaceModule,
    StarRatingModule.forRoot(),
    BrowserModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDjvjwzi7OqewPj29Qzvgi2Gebh_zpkSdw"
    })
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
