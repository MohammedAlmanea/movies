import express, { application } from 'express';
import moviesRouter from './routers/movies.router';
import usersRouter from './routers/user.router';
import likeRouter from './routers/like.router';
import saveRouter from './routers/save.router';

const app = express();
app.use(express.json());
const port = 6300;

app.use('/api/', moviesRouter);
app.use('/api/', likeRouter);
app.use('/api/', usersRouter);
app.use('/api/', saveRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
