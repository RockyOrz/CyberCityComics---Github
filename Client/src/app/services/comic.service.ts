import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private api_url = environment.api_url;

  constructor(private http: HttpClient) {
  }

  get_latest_comic(): Observable<any> {
    return this.http.get(this.api_url + 'latest');
  }

  get_comic(num: number): Observable<any> {
    return this.http.get(this.api_url + `${num}`);
  }

  get_view_history(num: number): Observable<any> {
    return this.http.get(this.api_url + `view/${num}`);
  }

  increment_view(num: number): Observable<any> {
    return this.http.get(this.api_url + `addView/${num}`);
  }

  
}
