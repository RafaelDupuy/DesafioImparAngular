import { Component, OnInit, } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  cardList: Card[] = [];
  constructor(private service: CardService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.service.getCards().subscribe((res) => {
      this.cardList = res;
    });
  }
}
