import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {

  hero: Hero|undefined;
constructor(
  private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location
) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.heroService.getHero(id).subscribe(
      hero => {
        this.hero=hero
      }
    )
  }

  goBack() {
    this.location.back();
  }
  

}
