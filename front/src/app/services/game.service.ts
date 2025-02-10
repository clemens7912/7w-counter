import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../shared/models/player';
import { BACKEND_URL } from '../shared/constants';
import { Wonder } from '../shared/models/wonder';
import { PlayerSelection } from '../shared/models/playerSelection';
import { Game } from '../shared/models/game';
import { clone } from '../shared/utils';
import { Stats } from '../shared/models/stats';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private players: PlayerSelection[];

  constructor(private http: HttpClient) { }

  createPlayer(name: string): Observable<Player> {
    return this.http.post<Player>(BACKEND_URL+'/api/games/player', {name});
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(BACKEND_URL+'/api/games/player');
  }

  getAllWonders(): Observable<Wonder[]>{
    return this.http.get<Wonder[]>(BACKEND_URL+'/api/games/wonder');
  }

  saveGame(players: PlayerSelection[]): Observable<Game> {
    return this.http.post<Game>(BACKEND_URL+'/api/games/', players);
  } 

  /*** Returns a copy of selected players */
  getPlayers(): PlayerSelection[]{
    return clone(this.players);
  }

  setPlayers(players: PlayerSelection[]){
    this.players = clone(players);
  }

  getWinner(): PlayerSelection | undefined {
    if(this.players[0].score){
      return clone(this.players.sort((a, b) => b.score!.totalPoints - a.score!.totalPoints)[0]);
    }

    return undefined;
  }

  getGamesStats(): Observable<Stats[]>{
    return this.http.get<Stats[]>(BACKEND_URL+'/api/games/data');
  }

}
