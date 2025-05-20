import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-page',
  imports: [],
  template: `<p>search-page works!</p>`,
  styleUrl: './search-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent { }
