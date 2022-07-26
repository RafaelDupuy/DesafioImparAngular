import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CardDto } from '../dto/card-dto';
import { ODataQueryBuilder } from '../helpers/odata-query-builder';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardDto: CardDto = new CardDto();
  private defaultUrl = `${environment.apiUrl}/card`;

  constructor(private http: HttpClient) {}

  getCards(searchString: string) {
    const query = new ODataQueryBuilder();
    query.paging(1, 10);
    if (searchString.trim().length > 0) {
      query
        .contains('name', searchString.trim())
        .or()
        .contains('status', searchString.trim());
    }
    const url = `${this.defaultUrl}${query.toString()}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return this.cardDto.convertODataResponseToCardList(data);
      })
    );
  }

  deleteCard(id: number) {
    const url = `${this.defaultUrl}/${id}`;
    return this.http.delete(url);
  }
}
