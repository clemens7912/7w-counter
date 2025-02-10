import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Wonder extends Model{
    @Column
    declare name: string; 

    @Column
    declare slug: string;
}