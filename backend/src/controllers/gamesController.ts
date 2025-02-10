import { Request, Response } from "express";
import { Player } from "../models/Player";
import { Wonder } from "../models/Wonder";
import { PlayerSelection } from "../interfaces/playerSelection";
import { Score } from "../models/Score";
import { Game } from "../models/Game";
import { col, fn, literal } from "sequelize";


export const createPlayer = async (req: Request, res: Response) => {
    const {name} = req.body;
    try {
        const player = await Player.create({
            name: name,
            userId: req.userId
        });

        return res.status(201).json(player);
    }catch(error: unknown){
        if(error instanceof Error){
            console.log(error.stack);
            res.status(500).json({
                'message': error.message
            });
        }else{
            console.log(error);
            res.status(500).json({
                'message':'Error creating player'
            });
        }
    }
}

export const getAllPlayers = async (req: Request, res: Response) => {
    try{
        const players = await Player.findAll({
            where: {
                userId: req.userId
            }
        });

        if(!players){
            return res.status(404).json({
                'message': 'No players found'
            });
        }

        res.status(200).json(players);
    }catch(error: unknown){
        if(error instanceof Error){
            console.log(error.stack);
            res.status(500).json({
                'message': error.message
            });
        }else{
            console.log(error);
            res.status(500).json({
                'message':'Error getting players'
            });
        }
    }
}

export const getAllWonders = async (req: Request, res: Response) => {
    try{
        const wonders = await Wonder.findAll();

        if(!wonders){
            return res.status(404).json({
                message: 'No wonders found'
            });
        }

        res.status(200).json(wonders);
    }catch(error: unknown){
        if(error instanceof Error){
            console.log(error.stack);
            res.status(500).json({
                'message': error.message
            });
        }else{
            console.log(error);
            res.status(500).json({
                'message':'Error getting players'
            });
        }
    }
}

export const saveGame = async (req: Request, res: Response) => {
    const players = req.body as PlayerSelection[];

    players.sort((a,b) => b.score!.totalPoints - a.score!.totalPoints);
    
    try{
        const game = await Game.create({
            userId: req.userId,
            winnerId: players[0].id,
        });

        players.forEach(async (player) => {
            await Score.create({
                gameId: game.id,
                playerId: player.id,
                ...player.score
            });
        })

        return res.status(200).json(game);
    }catch(error: unknown){
        if(error instanceof Error){
            console.log(error.stack);
            res.status(500).json({
                'message': error.message
            });
        }else{
            console.log(error);
            res.status(500).json({
                'message':'Error getting players'
            });
        }
    }
}

/**
 * Get total games played by each player, total victories
 */
export const getGamesPlayedByPlayer = async (req: Request, res: Response) => {
    const userId = req.userId;
    try{
        const results = await Player.findAll({
            attributes: [
                'id',
                'name',
                [fn('COUNT', col('scores.gameId')), 'totalGames'], // Correct alias for scores
                [fn('ROUND', fn('AVG', col('scores.totalPoints')), 2), 'averagePoints'],
                [fn('MAX', col('scores.totalPoints')), 'maxPoints'],
                [
                    fn(
                        'SUM',
                        literal('CASE WHEN `scores->game`.`winnerId` = `Player`.`id` THEN 1 ELSE 0 END')
                    ),
                    'totalWins',
                ],
            ],
            include: [
                {
                    model: Score,
                    required: true,
                    attributes: [],
                    include: [
                        {
                            model: Game,
                            as: 'game',
                            required: true,
                            attributes: [],
                            where: { userId },
                        },
                    ],
                },
            ],
            group: ['Player.id'], 
        });

        res.status(200).json(results);
    }catch(error: unknown){
        if(error instanceof Error){
            console.log(error.stack);
            res.status(500).json({
                'message': error.message
            });
        }else{
            console.log(error);
            res.status(500).json({
                'message':'Error getting players'
            });
        }
    }
}