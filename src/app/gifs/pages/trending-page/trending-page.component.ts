import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-trending-page',
  imports: [],
  template: `<p>trending-page works!</p>`,
  styleUrl: './trending-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent { }
