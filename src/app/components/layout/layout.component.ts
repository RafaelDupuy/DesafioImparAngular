import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit ,AfterViewInit {

  @ViewChild('sideNav') sideNav: MatSidenav;

  constructor(public sideNavService: SidenavService) { }

  ngAfterViewInit(): void {
    this.sideNavService.setSidenav(this.sideNav);
  }

  ngOnInit(): void {
  }

}
