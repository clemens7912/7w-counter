import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameService } from './game.service';
import { BACKEND_URL } from '../shared/constants';

describe('GameService', () => {
  let service: GameService; // Servicio a testear
  let httpMock: HttpTestingController; // Mock para interceptar solicitudes HTTP

  beforeEach(() => {
    // Configuración del entorno de pruebas
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importamos el módulo de pruebas de HTTP
      providers: [GameService] // Proveemos el servicio
    });

    service = TestBed.inject(GameService); // Obtenemos el servicio
    httpMock = TestBed.inject(HttpTestingController); // Obtenemos el mock de HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Verificamos que no queden solicitudes pendientes
  });

  it('should create the service', () => {
    // Comprobamos que el servicio se crea correctamente
    expect(service).toBeTruthy();
  });

  it('should fetch all players', () => {
    // Test para verificar la obtención de todos los jugadores
    const mockPlayers = [
      {
        "id": 1,
        "name": "Mekhi Considine",
        "userId": 61563
      },
      {
        "id": 2,
        "name": "Mekhi Considine",
        "userId": 61563
      }
    ]; // Respuesta simulada
    service.getAllPlayers().subscribe((players) => {
      expect(players.length).toBe(2); // Deben retornar 2 jugadores
      expect(players).toEqual(mockPlayers); // La respuesta debe coincidir con los datos simulados
    });

    // Interceptamos la solicitud y devolvemos la respuesta simulada
    const req = httpMock.expectOne(`${BACKEND_URL}/api/games/player`);
    expect(req.request.method).toBe('GET'); // La solicitud debe ser de tipo GET
    req.flush(mockPlayers); // Devolvemos los datos simulados
  });

  it('should save a game', () => {
    // Test para verificar que se guarde un juego
    const mockPlayers = [
      {
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
      },
      {
        "id": 2,
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
        }
      }
    ]; // Datos simulados
    service.saveGame(mockPlayers).subscribe((game) => {
      expect(game).toBeTruthy(); // La respuesta debe ser válida
    });

    // Interceptamos la solicitud de guardar un juego
    const req = httpMock.expectOne(`${BACKEND_URL}/api/games/`);
    expect(req.request.method).toBe('POST'); // La solicitud debe ser POST
    expect(req.request.body).toEqual(mockPlayers); // El cuerpo debe coincidir con los datos enviados
    req.flush({}); // Respuesta simulada
  });

  /* it('should set and get players', () => {
    // Test para verificar que los jugadores se configuren y obtengan correctamente
    const mockPlayers = [{ name: 'Player1', score: {} }]; // Datos simulados
    service.setPlayers(mockPlayers); // Configuramos los jugadores
    const players = service.getPlayers(); // Obtenemos los jugadores
    expect(players).toEqual(mockPlayers); // Los jugadores obtenidos deben coincidir con los configurados
    expect(players).not.toBe(mockPlayers); // Se debe devolver una copia (no la misma referencia)
  }); */
});
