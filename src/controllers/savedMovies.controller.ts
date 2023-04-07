import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Movie } from '@prisma/client';


export const addMovie = async (req: Request, res: Response) => {
  try {
    let newMovie = req.body as Movie;
    await prisma.movie.create({
      data: newMovie,
    });
    res.status(201).json({
      message: 'Movie added successfully',
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(500).json({
      message: prismaError.message,
    });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany()
    res.status(200).json({
      movies: movies,
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(500).json({
      message: prismaError.message,
    });
  }
}
