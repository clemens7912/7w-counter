import { Component, OnDestroy, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';
import { GameService } from '../../services/game.service';
import { PlayerSelection } from '../../shared/models/playerSelection';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-winner',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.scss'
})
export class WinnerComponent implements OnInit, OnDestroy{

  winner?: PlayerSelection;
  intervalId: number; 

  constructor(private gameService: GameService){}

  ngOnInit(): void {
    this.winner = this.gameService.getWinner();
    this.showConfetti();
  }

  showConfetti() {
    this.intervalId = window.setInterval(() => {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { x: 0.5, y: 0.5 }, // Start at the center
        colors: ['#FFC700', '#FF5733', '#33FF57', '#337BFF', '#FF33A1'],
        gravity: 0.8, // How fast the confetti falls,
        decay: 0.9,
        scalar: 1.2, // Size scaling of particles
        shapes: ['circle', 'square'], // Types of shapes
      });
    }, 4*1000);
  }

  stopInterval() {
    if(this.intervalId){
      window.clearInterval(this.intervalId);
    }
  }

  ngOnDestroy(): void {
      this.stopInterval();
  }


}
