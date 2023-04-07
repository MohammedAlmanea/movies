import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { LikedMovies } from '@prisma/client';

export const likeMovie = async (req: Request, res: Response) => {
  try {
    let newMovie = req.body as LikedMovies;
    await prisma.likedMovies.create({
      data: newMovie,
    });
    res.status(201).json({
      message: 'Movie likes successfully',
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(500).json({
      message: prismaError.message,
    });
  }
};

export const unlikeMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.likedMovies.delete({
      where: { id: id },
    });
    res.status(200).json({
      message: 'like deleted successfully',
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({
      message: prismaError.message,
    });
  }
};

export const getLikedMovies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movies = await prisma.likedMovies.findMany({
      where: { user_id: id },
      select: {
        id: true,
        movie: {
          select: {
            title: true,
            image: true,
            rating: true,
          },
        },
      },
    });
    res.status(200).json(movies);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(500).json({
      message: prismaError.message,
    });
  }
};

export const likedMoviesTitles = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movies = await prisma.likedMovies.findMany({
      where: { user_id: id },
      select: {
        movie: {
          select: {
            title: true,
          },
        },
      },
    });
    res.status(200).json(movies);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(500).json({
      message: prismaError.message,
    });
  }
};
