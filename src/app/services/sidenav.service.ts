import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { from, Subject } from 'rxjs';
import {
  ComponentPortal,
  ComponentType,
  Portal,
  TemplatePortal,
} from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  nav: MatSidenav;
  private panelPortal$ = new Subject<Portal<any>>();

  private viewContainerRef: ViewContainerRef;

  constructor() {}

  get panelPortal() {
    return from(this.panelPortal$);
  }

  setPanelPortal(panelPortal: Portal<any>) {
    this.panelPortal$.next(panelPortal);
  }

  setPanelContent(
    componentOrTemplateRef: ComponentType<any> | TemplateRef<any>
  ) {
    let portal: Portal<any>;
    if (componentOrTemplateRef instanceof TemplateRef) {
      const vcr = this.viewContainerRef;
      portal = new TemplatePortal(componentOrTemplateRef, vcr);
    } else {
      portal = new ComponentPortal(componentOrTemplateRef);
    }
    this.panelPortal$.next(portal);
  }

  setSidenav(sideNav: MatSidenav): void {
    this.nav = sideNav;
  }

  toggle(): void {
    this.nav.toggle();
  }

  open(portal?: Portal<any>) {
    if (portal) {
      this.panelPortal$.next(portal);
    }
    return this.nav.open();
  }
}
