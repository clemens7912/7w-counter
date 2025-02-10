import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Game } from "./Game";
import { Player } from "./Player";

@Table
export class Score extends Model{
    @Column
    @ForeignKey(() => Game)
    declare gameId: number;

    @BelongsTo(() => Game)
    declare game: Game;

    @Column
    @ForeignKey(() => Player)
    declare playerId: number;

    @BelongsTo(() => Player)
    declare player: Player;

    @Column
    declare wonderStages: number;

    @Column
    declare coins: number;

    @Column
    declare military: number;

    @Column
    declare civicStructures: number;

    @Column
    declare commercialStructures: number;

    @Column
    declare guilds: number;

    @Column
    declare scientificStructures: number;
    
    @Column
    declare totalPoints: number;
}