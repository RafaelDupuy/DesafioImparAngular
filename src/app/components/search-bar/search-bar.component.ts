import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchBarService } from 'src/app/search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() performedSearch: EventEmitter<any> = new EventEmitter<any>();

  get searchFieldValue(): string {
    return this.service.searchValue;
  }

  set searchFieldValue(value: string) {
    this.service.searchValue = value;
  }
  constructor(private service: SearchBarService) {}

  ngOnInit(): void {}

  handleKeyUp(event: any): void {
    if (event.key === 'Enter') {
      this.performedSearch.emit();
    }
  }
}
