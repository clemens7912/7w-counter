import {Sequelize} from 'sequelize-typescript';
import { User } from '../models/User';
import { Player } from '../models/Player';
import { Game } from '../models/Game';
import { Score } from '../models/Score';
import { Wonder } from '../models/Wonder';

const sequelize = new Sequelize({
    database: process.env.MYSQL_DB,
    dialect: 'mysql',
    username: process.env.MYSQL_USERNAME, 
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: 3306,
    models: [User, Player, Game, Score, Wonder]
});

export default sequelize;