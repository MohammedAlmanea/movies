import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const topMovies = (req: Request, res: Response) => {
  try {
    axios
      .get(`https://imdb-api.com/en/API/Top250Movies/${process.env.api_key}`)
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    console.log(`Error when fetching top movies: ${error}`);
  }
};

export const popularMovies = (req: Request, res: Response) => {
  try {
    axios
      .get(
        `https://imdb-api.com/en/API/MostPopularMovies/${process.env.api_key}`
      )
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    console.log(`Error when fetching popular movies: ${error}`);
  }
};

export const movieSearch = (req: Request, res: Response) => {
  const movieName = req.body.movie;
  try {
    axios
      .get(
        `https://imdb-api.com/en/API/SearchMovie/${process.env.api_key}/${movieName}`
      )
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    console.log(`Error when fetching movie search: ${error}`);
  }
};

export const movieInfo = (req: Request, res: Response) => {
  const  movieId  = req.params.id;
  
  try {
    axios
      .get(
        `https://imdb-api.com/en/API/Title/${process.env.api_key}/${movieId}`
      )
      .then((response) => {
        res.json(response.data);
      });
  } catch (error) {
    console.log(`Error when fetching movie information: ${error}`);
  }
};
