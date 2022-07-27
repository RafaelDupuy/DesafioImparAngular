import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnInit {
  @Input() card: Card = new Card();

  @Input() isEdit = false;

  constructor(
    private photoService: PhotoService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.card.file = <File>event.target.files[0];
  }

  handleCardCreate(): void {
    if(!this.cardService.validateCardCreation(this.card)){
      alert('Por favor, preencha todos os campos!');
      return;
    }
    this.uploadPhoto().then((res) => {
      this.card.photoId = res as number;
      this.cardService.createCard(this.card).subscribe(() => {
        location.reload();
      });
    })
  }
  async handleCardUpdate(): Promise<void> {
    if(this.card.file !== undefined){
      this.card.photoId = await this.uploadPhoto() as number;
    }
    this.cardService.updateCard(this.card).subscribe(() => location.reload());
  }

  async uploadPhoto(): Promise<Object | undefined>{
    return this.photoService.uploadPhoto(this.card.file).toPromise();
  }
}
