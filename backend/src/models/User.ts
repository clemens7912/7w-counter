import { Table, Column, Model, DataType, AllowNull, HasMany } from "sequelize-typescript";
import { Player } from "./Player";
import { Game } from "./Game";

@Table
export class User extends Model {
    @Column
    declare name: string;

    @Column({
        unique: true
    })
    declare email:string;

    @Column
    declare password: string;

    @HasMany(() => Player)
    declare players: Player[];

    @HasMany(() => Game)
    declare games: Game[];
}