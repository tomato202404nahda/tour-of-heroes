import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, LottieComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  heroes: Hero[] = [];

  options: AnimationOptions = {
    path: '/assets/Animation - 1714629086811.json',
  };

  doneLoading: boolean = false;

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
