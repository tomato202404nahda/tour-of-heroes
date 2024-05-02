import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
  imports: [
    CommonModule,
    FormsModule,
    HeroDetailComponent,
    RouterLink,
    LottieComponent,
  ],
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[];
  selectedHero: Hero | undefined;
  modalClosed: boolean = true;
  options: AnimationOptions = {
    path: '/assets/Animation - 1714629086811.json',
  };

  doneLoading: boolean = false;
  constructor(
    private messageService: MessageService,
    private heroService: HeroService
  ) {}

  openModal() {
    this.modalClosed = !this.modalClosed;
  }
  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.Heroes.subscribe((heroes) => {
      this.heroes = heroes;
      this.doneLoading = true;
    });
  }

  addHero(heroName: string) {
    this.doneLoading = false;
    const name = heroName.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(
      /*  (hero: Hero) => {
      return this.heroes.push(hero);
    } */
      () => {
        this.doneLoading = true;
      }
    );
    this.modalClosed = true;
    this.getHeroes();
  }

  delete(hero: Hero) {
    this.doneLoading = false;
    this.heroService.deleteHero(hero.id).subscribe((_) => {
      this.doneLoading = true;
    });
    this.getHeroes();
  }
}
