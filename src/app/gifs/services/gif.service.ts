import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyReponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';
const GIF_KEY = 'gifs';
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}
@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryComputed = computed(() => Object.keys(this.searchHistory()));


  constructor() {
    this.loadTrendingGifs();

  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  })

  loadTrendingGifs() {
    this.http.get<GiphyReponse>(`${environment.giphyUlr}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).subscribe((response) => {
      this.trendingGifs.set(GifMapper.mapGiphyItemsToGifArray(response.data));
      this.trendingGifsLoading.set(false);
    })
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyReponse>(`${environment.giphyUlr}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap((items) => {

        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items
        }));
      })
    )
    // .subscribe((response) => {
    //   // this.trendingGifs.set(GifMapper.mapGiphyItemsToGifArray(response.data));
    //   // this.trendingGifsLoading.set(false);
    //   console.log(response);
    // })
  }


  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }

}
