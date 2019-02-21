import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;


  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public isOpen() {
    return this.sidenav.opened;
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
