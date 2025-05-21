import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface ListItem {
  src: string;
}
@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItemComponent {
  img = input<string>();
 }
