import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { powerList } from '../power';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, LottieComponent],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  options: AnimationOptions = {
    path: '/assets/Animation - 1714629086811.json',
  };

  doneLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.heroService.getHero(id).subscribe((hero) => {
      this.doneLoading = false;
      this.hero = hero;
      this.doneLoading = true;
    });
  }
  powers: string[] = powerList();

  save() {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => {
        this.goBack();
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
