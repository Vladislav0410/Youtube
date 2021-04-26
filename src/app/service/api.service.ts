import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VideoDetail } from '../models/models';
import { url, API_KEY } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  search(
    query: string,
    order: string = 'relevance',
    duration: string = 'any',
    maxResults: number = 10
  ): Observable<VideoDetail[]> {
    const params: string = [
      `q=${query}`,
      `key=${API_KEY}`,
      `&order=${order}`,
      `part=snippet`,
      `type=video`,
      `videoDuration=${duration}`,
      `maxResults=${maxResults}`,
    ].join('&');

    const queryUrl = `${url}?${params}`;

    return this._http.get(queryUrl).pipe(
      map((response) => {
        return response['items'].map((item) => {
          const urlArr = [];
          let idVideo = item.id.videoId;
          const videoObj = {
            id: idVideo,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url,
            videoUrl: `https://www.youtube.com/watch?v=${idVideo}`,
          };
          urlArr.push(videoObj);
          return urlArr;
        });
      })
    );
  }
}
