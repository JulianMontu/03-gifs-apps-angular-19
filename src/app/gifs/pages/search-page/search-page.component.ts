import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifListComponent],
})
export default class SearchPageComponent { 
  public gifService = inject(GifService);
  onSerach(query: string) {
    this.gifService.searchGifs(query);
  }
}
