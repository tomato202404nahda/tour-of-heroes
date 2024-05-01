import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  
  ngOnInit(){
    this.getHeroes();
  }
  
  getHeroes(){
    this.heroService.Heroes.subscribe(
      heroes => {
          this.heroes=heroes.slice(1,5);
      }
  );
  }
}
