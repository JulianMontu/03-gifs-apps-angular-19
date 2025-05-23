import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifListComponent],
})
export default class SearchPageComponent { 
  public gifService = inject(GifService);
  gifs = signal<Gif[]>([]);
  onSerach(query: string) {
    this.gifService.searchGifs(query).subscribe((response) => {
      this.gifs.set(response);
    });
  }
}
