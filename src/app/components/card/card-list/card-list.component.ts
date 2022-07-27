import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Card } from 'src/app/models/card';
import { PaginationConfig } from 'src/app/models/pagination-config';
import { SearchBarService } from 'src/app/search-bar.service';
import { CardService } from 'src/app/services/card.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {

  @ViewChild('paging') matPaging: MatPaginator;
  cards: Card[] = [];

  paginationConfig: PaginationConfig = new PaginationConfig();

  constructor(
    private service: CardService,
    private searchService: SearchBarService,
    private sideNavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.paginationConfig.itemsPerPage = 10;
    this.paginationConfig.currentPage = 0;
    this.loadCards();
  }

  loadCards(): void {
    this.service.getCards(this.searchService.searchValue,this.paginationConfig).subscribe((res) => {
      this.paginationConfig.totalItems = res.total;
      this.cards = res.items!;
    });
  }

  handlePageChange($event: any){
    this.paginationConfig.currentPage =  $event.pageIndex;
    this.loadCards();
  }

  searchCards():void {
    this.matPaging.firstPage();
    this.paginationConfig.currentPage = 0;
    this.loadCards();
  }

  updateCard(card: Card): void {
    this.service.updateCard(card).subscribe(() => {
      this.loadCards();
    })
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
