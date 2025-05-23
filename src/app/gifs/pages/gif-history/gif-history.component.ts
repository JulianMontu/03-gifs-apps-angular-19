import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gif.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  templateUrl: './gif-history.component.html',
  imports: [GifListComponent],
})
export default class GifHistoryComponent {
  query = toSignal(inject(ActivatedRoute).params.pipe(
    map((params) => params['query'] || ''),
  ))

  gifService = inject(GifService);

  gifByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  })
}
