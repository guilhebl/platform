import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'bc-product-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();

  get isTrendingSearch() {
    return this.query == '';
  }

  ngOnInit() {
    this.searchTrending();
  }

  searchTrending() {
    this.query = '';
    this.search.emit('');
  }
}
