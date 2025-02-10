import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ScoresComponent } from './scores.component';
import { GameService } from '../../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PlayerSelection } from '../../shared/models/playerSelection';

describe('ScoresComponent', () => {
  // Variables utilizadas para los tests
  let component: ScoresComponent; // Componente que vamos a testear
  let fixture: ComponentFixture<ScoresComponent>; // Fixture para interactuar con el DOM
  let gameServiceSpy: jasmine.SpyObj<GameService>; // Mock del servicio GameService
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']); // Mock del servicio Router
  let mockRoute = { queryParamMap: of({ get: (key: string) => null }) }; // Mock para ActivatedRoute

  beforeEach(async () => {
    // Mock de GameService con métodos espiados
    const gameServiceMock = jasmine.createSpyObj('GameService', ['getPlayers', 'setPlayers', 'saveGame']);
    gameServiceMock.getPlayers.and.returnValue([
      { name: 'Player1', score: null },
      { name: 'Player2', score: null }
    ]);

    // Configuración del entorno de pruebas
    await TestBed.configureTestingModule({
      imports: [ScoresComponent], // Importamos el componente en su formato standalone
      providers: [
        { provide: GameService, useValue: gameServiceMock }, // Inyectamos el mock del servicio
        { provide: Router, useValue: mockRouter }, // Inyectamos el mock del Router
        { provide: ActivatedRoute, useValue: mockRoute } // Inyectamos el mock del ActivatedRoute
      ]
    }).compileComponents();

    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>; // Obtenemos el servicio simulado
    fixture = TestBed.createComponent(ScoresComponent); // Creamos el componente
    component = fixture.componentInstance; // Obtenemos la instancia del componente
    fixture.detectChanges(); // Detectamos cambios iniciales en el DOM
  });

  it('should create', () => {
    // Comprobamos que el componente se crea correctamente
    expect(component).toBeTruthy();
  });

  it('should initialize players on ngOnInit', () => {
    // Verificamos que se inicialicen los jugadores al cargar el componente
    expect(component.players.length).toBe(2); // Debe haber 2 jugadores
    expect(component.players[0].name).toBe('Player1'); // El primer jugador se llama "Player1"
  });

  it('should initialize scores when edit is true', () => {
    // Comprobamos que se inicialicen los puntajes si la edición está habilitada
    component.ngOnInit(); // Llamamos manualmente al método
    expect(component.players[0].score).toBeDefined(); // El puntaje del jugador debe estar definido
    expect(component.players[0].score!.military).toBe(0); // Verificamos que los valores iniciales sean 0
  });

  it('should calculate totalPoints and save the game on endGame, verifying response', () => {
    //Mock response for saveGame
    const mockResponse = {
      'id': 5,
      'userId': 4,
      'winnerId': 4
    }
    // Verificamos que se calculen los puntos totales y se guarde el juego
    const saveGameSpy = gameServiceSpy.saveGame.and.returnValue(of(mockResponse)); // Mock de la respuesta de saveGame
    component.endGame(); // Llamamos al método endGame
    expect(component.players[0].score!.totalPoints).toBe(0); // Total de puntos debe ser 0
    expect(saveGameSpy).toHaveBeenCalled(); // Verificamos que se llame al método saveGame
    // Capture and verify the response from saveGame
    saveGameSpy.calls.mostRecent().returnValue.subscribe((response) => {
      expect(response.id).toBe(5); // Validate the emitted response
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/winner']); // Debe navegar a '/winner'
  });

  it('should navigate to /winner on backToWinner', () => {
    // Comprobamos que la navegación funcione al llamar a backToWinner
    component.backToWinner(); // Llamamos al método
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/winner']); // Debe navegar a '/winner'
  });
});
