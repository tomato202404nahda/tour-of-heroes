import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Hero } from './hero';
import { PowerList } from './power';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} | Observable<{}> | Promise<{}> {
    const heroes = [
      { id: 12, name: 'Dr. Nice', power: PowerList.PM },
      { id: 13, name: 'Bombasto', power: PowerList.EX },
      { id: 14, name: 'Celeritas', power: PowerList.LI },
      { id: 15, name: 'Magneta', power: PowerList.MC },
      { id: 16, name: 'RubberMan', power: PowerList.RB },
      { id: 17, name: 'Dynama', power: PowerList.EX },
      { id: 18, name: 'Dr. IQ', power: PowerList.OS },
      { id: 19, name: 'Magma', power: PowerList.FL },
      { id: 20, name: 'Tornado', power: PowerList.WC },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
