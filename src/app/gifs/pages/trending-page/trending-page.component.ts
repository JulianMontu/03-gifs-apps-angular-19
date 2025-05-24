import { AfterViewInit, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gif.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{
  public gifService = inject(GifService);
  gifs = computed(() => this.gifService.trendingGifs());
  scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit() {
    const scrollDivRef = this.scrollDivRef()?.nativeElement;
    if (!scrollDivRef) return;

    scrollDivRef.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll($event: Event) {
    const scrollDivRef = this.scrollDivRef()?.nativeElement;
    if (!scrollDivRef) return;

    const scrollTop = scrollDivRef.scrollTop;
    const clientHeight = scrollDivRef.clientHeight;
    const scrollHeight = scrollDivRef.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
