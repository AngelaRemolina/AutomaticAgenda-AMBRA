import { Request, Response } from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

const DB_URL = process.env.DB_URL;

declare module "express-serve-static-core" {
    interface Request {
        userId: string
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.name) {
            return res.status(400).send();
        }

        const response = await fetch(DB_URL + '/users', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return res.status(400).send();
        }

        const user = await response.json();

        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getUserToken = async (req: Request, res: Response) => {
    try {

        const response = await fetch(DB_URL + '/users/' + req.body.username);

        if (!response.ok) {
            return res.status(404).send();
        }

        const user = await response.json();

        if (!user) {
            return res.status(401).send();
        }

        const isPasswordMatch = req.body.password === user.password;

        if (!isPasswordMatch) {
            return res.status(402).send();
        }
        const token = jwt.sign(
            { _id: user._id.toString() },
            process.env.SECRET_KEY!,
        );
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
};