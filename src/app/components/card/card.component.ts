import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Card } from 'src/app/models/card';
import { PhotoService } from 'src/app/services/photo.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: Card;

  @Output() cardEdited: EventEmitter<Card> = new EventEmitter();

  @Input() deleteCardCallback: () => void;

  @Output() editButtonClicked: EventEmitter<boolean> = new EventEmitter();

  toggleSideNav: boolean = false;

  constructor(
    private sideNavService: SidenavService,
    private photoService: PhotoService,
    private vcf: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getCardPhoto();
  }

  getCardPhoto() {
    this.photoService.getPhotoById(this.card.photoId).subscribe((res) => {
      const reader = new FileReader();
      if (res.body !== null) {
        reader.readAsDataURL(res.body);
        reader.onload = (_event) => {
          const url = reader.result;
          this.card.imageUrl = url;
        };
      }
    });
  }
  handleCardDelete(): void {
    this.deleteCardCallback();
  }

  handleSideNavToggle(): void {
    this.sideNavService.toggle();
  }

  openRightPanel(templateRef: TemplateRef<any>): void {
    const portal = new TemplatePortal(templateRef, this.vcf);
    this.sideNavService.open(portal);
  }
}
