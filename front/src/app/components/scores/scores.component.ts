import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { PlayerSelection } from '../../shared/models/playerSelection';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Score } from '../../shared/models/score';
import { PointsCountPipe } from '../../shared/pipes/points-count.pipe';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { CamelToNormalPipe } from '../../shared/pipes/camel-to-normal.pipe';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule, FormsModule, PointsCountPipe, CamelToNormalPipe],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
})
export class ScoresComponent implements OnInit{

  players: PlayerSelection[];
  edit: boolean = true;

  /** Variables used only for small screens */
  categories: (keyof Score)[];
  activeCategory: number = 0;
  /**End of small screens variables */

  constructor(private gameService: GameService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.players = this.gameService.getPlayers();
    this.route.queryParamMap.subscribe((params) => {
      //If we don't pass it (param is null) or it is true, edit will be true
      //if we pass false, edit will be false
      this.edit = !(params.get('edit') === 'false');
      this.players.forEach((player) => {
        if(this.edit){
          player.score = this.initializeScore();
        }else{
          player.score!.totalPoints = 0;
        }
      });
      this.categories = Object.keys(this.initializeScore()) as (keyof Score)[];
    });
  }

  initializeScore(): Score {
    return {
      military: 0,
      coins: 0,
      wonderStages: 0,
      civicStructures: 0,
      commercialStructures: 0,
      guilds: 0,
      scientificStructures: 0,
      totalPoints: 0
    };
  }

  endGame(){
    this.players.forEach((player) => {
      player.score!.totalPoints = Object.values(player.score!).reduce((acc, val) => acc+val, 0);
    });
    this.gameService.setPlayers(this.players);
    this.gameService.saveGame(this.players).subscribe({
      next: (game) => {
        this.router.navigate(['/winner']);
      }
    });
  }

  backToWinner(){
    this.router.navigate(['/winner']);
  }

  /** Small screens category navigator*/
  nextCategory(up: boolean){
    if(up){
      this.activeCategory = (this.activeCategory + 1) % this.categories.length;
    }else{
      this.activeCategory = (this.activeCategory + (this.categories.length-1)) % this.categories.length;
    }
  }

}
