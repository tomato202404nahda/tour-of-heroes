import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, Subject, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroChange = Subject<Hero[]>;
  constructor(private messageService: MessageService) {

   }


  get Heroes(): Observable<Hero[]>{
    const heroes = of(HEROES);
    this.messageService.add('HeroService: Heroes List Fetched');
    console.log(this.messageService.messages)
    return heroes
  }

  getHero(id: string): Observable<Hero> {
    const hero = HEROES.find(h => h.id === Number(id))!;

    return of(hero);
  }
}
