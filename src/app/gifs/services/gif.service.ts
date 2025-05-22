import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyReponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);
  trendingGifs= signal<Gif[]>([]);
  trendingGifsLoading= signal<boolean>(true);


  constructor() {
    this.loadTrendingGifs();
  }

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

}
