import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private heroesUrl = 'api/heroes';
  heroChange = new Subject<Hero[]>();
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  get Heroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: Heroes List Fetched');

    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>('Heroes', [])));
  }

  getHero(id: string): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === Number(id))!;

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  updateHero(hero: Hero) {
    const uh = this.http.put(this.heroesUrl, hero, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });

    return uh;
  }

  addHero(hero: Hero) {
    const bro = this.http
      .post(this.heroesUrl, hero, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );

    return bro;
  }

  deleteHero(id: number) {
    const url = `${this.heroesUrl}/${id}`;

    const dh = this.http.delete<Hero>(url).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );

    return dh;
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
