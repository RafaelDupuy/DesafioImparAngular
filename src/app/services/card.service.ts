import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import CardDto from '../dto/card-dto';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardDto: CardDto = new CardDto();
  private defaultUrl = `${environment.apiUrl}/card`;

  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get(this.defaultUrl).pipe(map((data: any) => {
      return this.cardDto.convertJsonListToCard(data);
    }));
  }
}
