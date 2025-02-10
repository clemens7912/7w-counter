import { Player } from "../models/Player";
import { Score } from "../models/Score";
import { Wonder } from "../models/Wonder";


export interface PlayerSelection extends Player{
    wonder?: Wonder, 
    side?: string,
    score?: Score
}