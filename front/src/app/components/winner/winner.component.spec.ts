import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponent } from './winner.component';
import { GameService } from '../../services/game.service';
import { PlayerSelection } from '../../shared/models/playerSelection';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('WinnerComponent', () => {
  let component: WinnerComponent;
  let fixture: ComponentFixture<WinnerComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let clearIntervalSpy: jasmine.Spy;
  const fakeIntervalId = 777;
  let setIntervalSpy: jasmine.Spy;
  let winner: PlayerSelection;

  beforeEach(async () => {
    const gameServiceMock = jasmine.createSpyObj<GameService>('GameService', ['getWinner']);
    winner = {
      "id": 1,
      "name": "Mekhi Considine",
      "userId": 61563,
      "wonder": {
        "id": 2,
        "name": "Dr. Rowena Sawayn",
        "slug": "Velit aut perferendis incidunt adipisci ullam qui et modi. Possimus assumenda et omnis accusantium molestias aut. Voluptatum reiciendis quam. Fugiat nostrum expedita et rem est. Quia enim ut voluptatum quis ut. Vel eaque atque voluptate aut aliquam."
      },
      "side": "Voluptatem doloremque eum quam. Vero aut vitae. Iste iusto velit voluptates pariatur quidem. Enim asperiores accusamus aut quis et nesciunt. Harum eligendi et exercitationem ut repudiandae suscipit et. Vel et ea sed corporis.",
      "score": {
          "wonderStages": 64513,
          "coins": 71454,
          "military": 49057,
          "civicStructures": 83793,
          "commercialStructures": 17271,
          "guilds": 16425,
          "scientificStructures": 30187,
          "totalPoints": 93081
      },
    };
    gameServiceMock.getWinner.and.returnValue(winner);

    //mock setInterval
    spyOn(window as any, 'setInterval').and.callFake((handler: TimerHandler, timeout?: number|undefined, ...args: any[]): number => {
      expect(timeout).toBe(4000);
      
      return fakeIntervalId;
    });

    // Mock ActivatedRoute
    const activatedRouteMock = {
      queryParamMap: of(new Map())  // Mocking the queryParamMap observable
    };
    
    await TestBed.configureTestingModule({
      imports: [WinnerComponent],
      providers: [
        {provide: GameService, useValue: gameServiceMock},
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();
    
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;

    //spy show confetti
    spyOn(component, 'showConfetti').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the winner and init confetti on ngOnInit', () => {
    expect(component.winner).toEqual(winner);
    expect(component.winner?.id).toBe(1);

    expect(component.showConfetti).toHaveBeenCalled();
    expect(component.intervalId).toEqual(777);
  })

  it('should clear interval on destroy', () => {
    const clearSpy = spyOn(window, 'clearInterval');
    component.ngOnDestroy();
    expect(clearSpy).toHaveBeenCalledWith(777);
  })

  it('should display winner information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('.winner .name')!;
    const totalPointsElement = compiled.querySelector('.winner .points')!;

    expect(nameElement.textContent).toBe('Mekhi Considine');
    expect(totalPointsElement.textContent).toBe('93081 points');
  })
});
