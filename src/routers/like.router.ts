import express from 'express';
import { getLikedMovies, likeMovie, likedMoviesTitles, unlikeMovie } from '../controllers/likedMovies.controller';


const router = express.Router();

router.post('/movie/like', likeMovie);
router.delete('/movie/unlike/:id', unlikeMovie);
router.get('/movie/:id',getLikedMovies)
router.get('/movie/title/:id',likedMoviesTitles)


export default router;
