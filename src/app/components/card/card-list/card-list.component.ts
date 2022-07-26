import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/models/card';
import { SearchBarService } from 'src/app/search-bar.service';
import { CardService } from 'src/app/services/card.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];

  constructor(
    private service: CardService,
    private searchService: SearchBarService,
    private sideNavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.service.getCards(this.searchService.searchValue).subscribe((res) => {
      this.cards = res;
    });
  }

  deleteCard(id: number): void {
    this.service.deleteCard(id).subscribe(() => {
      this.loadCards();
    });
  }

  deleteCardCallback(id: number): () => void {
    return () => this.deleteCard(id);
  }

  toggleSideNav():void {
    this.sideNavService.toggle();
  }
}
