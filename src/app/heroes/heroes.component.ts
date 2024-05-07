import { Component, OnDestroy, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { Subscription } from 'rxjs';

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
    HeroFormComponent,
  ],
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[];
  selectedHero: Hero | undefined;
  modalClosed: boolean = true;
  options: AnimationOptions = {
    path: '/assets/Animation - 1714629086811.json',
  };

  heroAddedSubscription: Subscription;

  doneLoading: boolean = false;
  addingOrDeleting: boolean = false;
  constructor(
    private messageService: MessageService,
    private heroService: HeroService
  ) {}

  openModal() {
    this.modalClosed = !this.modalClosed;
  }
  closeModal() {
    this.modalClosed = true;
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

  addHero(hero: Hero) {
    this.addingOrDeleting = true;

    if (!hero) {
      return;
    }
    const name = hero.name;
    const alter_ego = hero.alter_ego;
    const power = hero.power;
    this.heroService.addHero({ name, alter_ego, power } as Hero).subscribe(
      /*  (hero: Hero) => {
      return this.heroes.push(hero);
    } */
      () => {
        this.addingOrDeleting = false;
      }
    );
    this.modalClosed = true;
    this.getHeroes();
  }

  delete(hero: Hero) {
    this.addingOrDeleting = true;
    this.heroService.deleteHero(hero.id).subscribe(() => {
      this.addingOrDeleting = false;
    });
    this.getHeroes();
  }
}
