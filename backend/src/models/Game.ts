import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { Player } from "./Player";
import { Score } from "./Score";

@Table
export class Game extends Model {
    @Column
    @ForeignKey(() => User)
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @Column
    @ForeignKey(() => Player)
    declare winnerId: number;

    @BelongsTo(() => Player)
    declare player: Player;

    @HasMany(() => Score)
    declare scores: Score[];
}