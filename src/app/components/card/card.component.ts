import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';

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

  constructor() {}

  ngOnInit(): void {}

  handleCardDelete() {
    this.deleteCardCallback();
  }

  handleSideNavToggle(): void {
    this.editButtonClicked.emit(true);
  }
}
