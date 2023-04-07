import express from 'express';
import { addMovie, getMovies } from '../controllers/savedMovies.controller';

const router = express.Router();

router.post('/movie/add', addMovie );
router.get('/movie', getMovies );

export default router;
