import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { Game } from "./Game";
import { Score } from "./Score";

@Table
export class Player extends Model {
    @Column
    declare name: string;

    @ForeignKey(() => User)
    @Column({
        comment: 'Id of the user that has created this player'
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @HasMany(() => Game)
    declare games: Game[];

    @HasMany(() => Score)
    declare scores: Score[];
}