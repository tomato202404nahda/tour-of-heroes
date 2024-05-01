import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroService } from '../hero.service';
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-heroes',
    standalone: true,
    templateUrl: './heroes.component.html',
    styleUrl: './heroes.component.css',
    imports: [
        CommonModule,
        FormsModule,
        HeroDetailComponent,
        RouterLink
    ]
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[];
  selectedHero: Hero | undefined;
  
  constructor(private messageService: MessageService ,private heroService: HeroService){
    
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }
  
  ngOnInit(){
    this.getHeroes();
  }
  
  getHeroes(){
    this.heroService.Heroes.subscribe(
      heroes => {
          this.heroes=heroes;
      }
  );
  }
}
