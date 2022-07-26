import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  nav: MatSidenav;

  constructor() {}

  setSidenav(sideNav: MatSidenav): void {
    this.nav = sideNav;
  }

  toggle(): void {
    this.nav.toggle();
  }
}
