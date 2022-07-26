import { TemplatePortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { Card } from 'src/app/models/card';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: Card;

  @Input() deleteCardCallback: () => void;

  @Output() editButtonClicked: EventEmitter<boolean> = new EventEmitter();
  toggleSideNav: boolean = false;

  constructor(private sideNavService: SidenavService,
    private vcf: ViewContainerRef) {}

  ngOnInit(): void {}

  handleCardDelete() {
    this.deleteCardCallback();
  }

  handleSideNavToggle(): void {
    this.sideNavService.toggle();
  }

  openRightPanel(templateRef: TemplateRef<any>) {
    const portal = new TemplatePortal(templateRef, this.vcf);
    this.sideNavService.open(portal);
  }
}
