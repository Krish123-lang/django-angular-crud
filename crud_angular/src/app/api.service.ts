import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseurl = 'http://localhost:8000';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this.http.get(this.baseurl + '/movies/', {
      headers: this.httpHeaders,
    });
  }

  getOneMovie(id: any): Observable<any> {
    return this.http.get(this.baseurl + '/movies/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  updateMovie(movie: any): Observable<any> {
    const body = {
      title: movie.title,
      description: movie.description,
      year: movie.year,
    };
    return this.http.put(this.baseurl + '/movies/' + movie.id + '/', body, {
      headers: this.httpHeaders,
    });
  }

  createMovie(movie: any): Observable<any> {
    const body = {
      title: movie.title,
      description: movie.description,
      year: movie.year,
    };
    return this.http.post(this.baseurl + '/movies/', body, {
      headers: this.httpHeaders,
    });
  }

  deleteMovie(id: any): Observable<any> {
    return this.http.delete(this.baseurl + '/movies/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
}
