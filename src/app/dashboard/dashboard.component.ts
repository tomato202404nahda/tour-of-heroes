import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [RouterLink, LottieComponent, HeroSearchComponent],
})
export class DashboardComponent {
  heroes: Hero[] = [];

  options: AnimationOptions = {
    path: '/assets/Animation - 1714629086811.json',
  };

  doneLoading: boolean = true;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.doneLoading = false;
    this.heroService.Heroes.subscribe((heroes) => {
      this.heroes = heroes.slice(1, 5);
      this.doneLoading = true;
    });
  }
}
