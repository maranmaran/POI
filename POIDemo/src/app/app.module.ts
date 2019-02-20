import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";

import { AgmCoreModule } from "@agm/core";
import { AppMaterialModule } from "./modules/app-material.module";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ErrorComponent } from "./handle-pages/error/error.component";
import { DashboardComponent } from './application/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, ErrorComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDjvjwzi7OqewPj29Qzvgi2Gebh_zpkSdw"
    })
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
