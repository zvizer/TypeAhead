import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<any> {
    const keywords = 'cctv';
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', `${query} ${keywords}`)
      .set('maxResults', '200')
      .set('key', environment.youtubeAPIKey);

    return this.http.get(`${this.apiUrl}/search`, { params }).pipe(
      map((response) => {
        return response['items'].map(
          (item) => item.snippet.thumbnails.default.url
        );
      })
    );
  }
}
