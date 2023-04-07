import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const Register = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    const salt = parseInt(process.env.salt_rounds as string);
    const pepper = process.env.pepper_key as string;
    const pepperedPass = `${newUser.password}${pepper}`;
    newUser.password = await bcrypt.hash(pepperedPass, salt);
    console.log(newUser);

    await prisma.user.create({
      data: newUser,
    });
    res.status(201).json({
      message: ' added user successfully',
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({
      message: prismaError.message,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    const login = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log(login);

    const pepper = process.env.pepper_key as string;
    const pepperedPass = `${password}${pepper}`;
    const validPass = bcrypt.compareSync(pepperedPass, login!.password);
    console.log(validPass);
    if (!validPass) {
      return res.status(401).json({
        message: 'Invalid Credentials',
      });
    }
    res.status(200).json({
      message: 'Login Successful',
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({
      message: prismaError.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(201).json({
      users: users,
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({
      message: prismaError.message,
    });
  }
};
