import { Card } from '../models/card';
import { PaginatedResult } from '../models/paginated-result';

export class CardDto {
  convertODataResponseToCardList(data: any): PaginatedResult<Card> {
    const pagination = new PaginatedResult<Card>();
    pagination.total = data.total;
    pagination.items = data.items?.map((item: Card) =>
      this.convertJsonToCard(item)
    );

    return pagination;
  }

  convertJsonListToCard(data: any): Card[] {
    const cardList = [];
    for (const card of data) {
      cardList.push(this.convertJsonToCard(card));
    }
    return cardList;
  }

  convertJsonToCard(data: any): Card {
    const card = new Card();
    card.id = data.id;
    card.name = data.name;
    card.status = data.status;
    card.photoId = data.photoId;
    return card;
  }

  convertCardToJson(card: Card): object {
    return {
      name: card.name,
      status: card.status,
      photoId: card.photoId,
    };
  }
}
