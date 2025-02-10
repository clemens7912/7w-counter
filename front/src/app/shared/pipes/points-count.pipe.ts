import { Pipe, PipeTransform } from '@angular/core';
import { Score } from '../models/score';

@Pipe({
  name: 'pointsCount',
  standalone: true,
  pure: false
})
export class PointsCountPipe implements PipeTransform {

  transform(score: Score): number {
    let totalPoints = 0;
    Object.keys(score).forEach(key => {
      if(key != 'totalPoints'){
        totalPoints += score[key as keyof Score];
      }
    })

    return totalPoints;
  }

}
