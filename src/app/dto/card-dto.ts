import { Card } from "../models/card";

export default class CardDto {

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
        return card;
    }
}