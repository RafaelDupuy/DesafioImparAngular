import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  cards: Card[] = [];
  constructor(private service: CardService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.service.getCards().subscribe((res) => {
      this.cards = res;
    });
  }

}
