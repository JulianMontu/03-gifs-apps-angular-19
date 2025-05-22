import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyReponse } from '../interfaces/giphy.interface';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient)


  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyReponse>(`${environment.giphyUlr}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    });
  }

}
