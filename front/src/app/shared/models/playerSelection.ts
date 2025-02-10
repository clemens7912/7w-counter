import { Player } from "./player";
import { Score } from "./score";
import { Wonder } from "./wonder";

export interface PlayerSelection extends Player{
    wonder?: Wonder, 
    side?: string,
    score?: Score
}