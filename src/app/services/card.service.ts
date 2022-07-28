import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CardDto } from '../dto/card-dto';
import { ODataQueryBuilder } from '../helpers/odata-query-builder';
import { Card } from '../models/card';
import { PaginationConfig } from '../models/pagination-config';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardDto: CardDto = new CardDto();
  private defaultUrl = `${environment.apiUrl}/card`;

  constructor(private http: HttpClient) {}

  getCards(searchString: string, paginationConfig: PaginationConfig) {
    const query = this.getSearchString(searchString, paginationConfig);
    const url = `${this.defaultUrl}${query.toString()}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return this.cardDto.convertODataResponseToCardList(data);
      })
    );
  }

  updateCard(card: Card) {
    const url = `${this.defaultUrl}/${card.id}`;
    const cardJson = this.cardDto.convertCardToJson(card);
    return this.http.put(url, cardJson);
  }

  deleteCard(id: number) {
    const url = `${this.defaultUrl}/${id}`;
    return this.http.delete(url);
  }

  createCard(card: Card) {
    const cardJson = this.cardDto.convertCardToJson(card);
    return this.http.post(this.defaultUrl, cardJson);
  }

  validateCardCreation(card: Card) {
    return card.file !== undefined && this.validateCardUpdate(card);
  }

  validateCardUpdate(card: Card) {
    return (
      card.name?.length > 0 &&
      card.name?.length <= 100 &&
      card.status?.length > 0 &&
      card.status?.length <= 100
    );
  }

  private getSearchString(
    searchString: string,
    paginationConfig: PaginationConfig
  ): string {
    const query = new ODataQueryBuilder()
      .paging(paginationConfig.currentPage!, paginationConfig.itemsPerPage!)
      .orderBy('Id', 'desc');
    if (searchString.trim().length > 0) {
      query
        .contains('name', searchString.trim())
        .or()
        .contains('status', searchString.trim());
    }
    return query.toString();
  }
}
