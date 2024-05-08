import { Component, EventEmitter, Output } from '@angular/core';
import { Hero } from '../hero';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { powerList } from '../power';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css',
})
export class HeroFormComponent {
  powers: string[] = powerList();

  @Output() modalClose = new EventEmitter<boolean>();

  model = new Hero(18, 'Dr. IQ', this.powers[0], 'Subroto');

  @Output() addHero = new EventEmitter<Hero>();
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.addHero.emit(this.model);
  }
  closeModal() {
    this.modalClose.emit(false);
  }
}
