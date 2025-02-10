import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../../shared/models/player';
import { GameService } from '../../services/game.service';
import { Wonder } from '../../shared/models/wonder';
import { PlayerSelection } from '../../shared/models/playerSelection';
import { Router } from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WonderSelectionModalComponent } from '../wonder-selection-modal/wonder-selection-modal.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit{

  playerForm: FormGroup;
  players: PlayerSelection[] = [];
  wonders: Wonder[] = [];
  selectedPlayers: PlayerSelection[] = [];
  selectedPlayersError = '';
  smallScreen: boolean = false;
  

  constructor(private fb: FormBuilder,
              private gameService: GameService,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              private modalService: NgbModal){}

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.getAllPlayers();
    this.getAllWonders();

    this.breakpointObserver.observe('(max-width: 700px)').subscribe((result) => {
      this.smallScreen = result.matches;
    })
  }

  createPlayer(event: Event){
    event.preventDefault();
    this.gameService.createPlayer(this.playerForm.get('name')?.value).subscribe({
      next: (player) => {
        this.players.push(player);
        this.playerForm.reset();
      }, 
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  getAllPlayers(){
    this.gameService.getAllPlayers().subscribe({
      next: (players) => {
        this.players = players;
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  getAllWonders(){
    this.gameService.getAllWonders().subscribe({
      next: (wonders) => {
        this.wonders = wonders;
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  async openPlayerSelection(index: number){
    //If screen is small, we open modal to select wonder and side
    if(this.smallScreen){
      const modalRef = this.modalService.open(WonderSelectionModalComponent, {size: 'sm', windowClass: 'modal-full-mobile'});
      modalRef.componentInstance.wonders = this.wonders;
      modalRef.componentInstance.player = {...this.players[index]};

      //we wait for the result
      try{
        const result = await modalRef.result as PlayerSelection;
        this.players[index] = result;
      }catch(reason){
        return;
      }
    }

    this.selectPlayer(index);
  }

  selectPlayer(index: number){
    this.selectedPlayersError = '';
    if(!this.players[index].wonder || !this.players[index].side){
      this.selectedPlayersError = 'You must select a wonder and a side';
      setTimeout(() => {
        this.selectedPlayersError = '';
      }, 5*1000);
      return;
    }

    this.wonders = this.wonders.filter((wonder => {
      return wonder.id != this.players[index].wonder!.id;
    }))

    this.selectedPlayers.push(this.players[index]);
    this.players.splice(index, 1);
  }

  removeSelectedPlayer(index: number){
    //Put wonder back to available wonders
    this.wonders.push(this.selectedPlayers[index].wonder!);
    //We mark wonder and side as undefined and add it back to players
    this.selectedPlayers[index].side = undefined;
    this.selectedPlayers[index].wonder = undefined;
    this.players.push(this.selectedPlayers[index]);

    //We remove the player from selected list
    this.selectedPlayers.splice(index, 1);
  }
  
  startGame(){
    this.gameService.setPlayers(this.selectedPlayers);
    console.log(this.selectedPlayers);
    this.router.navigate(['/score'], {skipLocationChange: true});
  }
}
