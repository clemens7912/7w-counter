import express, { Request, Response } from 'express';
import cors from 'cors';
import sequelize from './config/sequelize';
import userRoutes from './routes/userRoutes';
import gamesRoutes from './routes/gamesRoutes';
import cookieSession from 'cookie-session';

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        'credentials': true,
        'origin': ['http://localhost:4200']
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: '7w-session',
  secret: process.env.COOKIE_SECRET,
  httpOnly: true
}));

app.use('/api/auth', userRoutes);
app.use('/api/games', gamesRoutes);

const startServer = async () => {
  try{
    //await sequelize.sync({alter: true});
    await sequelize.sync();
    console.log('Database synced successfully');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }catch(error){
    console.error('Unable to sync database', error);
  }
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

startServer();
