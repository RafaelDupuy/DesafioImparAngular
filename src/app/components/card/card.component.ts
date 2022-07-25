import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;

  @Input() deleteCardCallback: () => void;
  
  constructor() { }

  ngOnInit(): void {
  }

  handleCardDelete(){
    this.deleteCardCallback();
  }
}
