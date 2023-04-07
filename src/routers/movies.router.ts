import express from 'express';
import {
  movieInfo,
  movieSearch,
  popularMovies,
  topMovies,
} from '../controllers/movies.controller';

const router = express.Router();

router.get('/top', topMovies);
router.get('/popular', popularMovies);
router.get('/search', movieSearch);
router.get('/info/:id', movieInfo);

export default router;
