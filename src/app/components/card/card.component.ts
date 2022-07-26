import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: Card;

  @Input() deleteCardCallback: () => void;

  @Output() editButtonClicked: EventEmitter<boolean> = new EventEmitter();
  toggleSideNav: boolean = false;

  constructor(private sideNavService: SidenavService) {}

  ngOnInit(): void {}

  handleCardDelete() {
    this.deleteCardCallback();
  }

  handleSideNavToggle(): void {
    this.sideNavService.toggle();
  }
}
