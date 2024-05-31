import { Request, Response } from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const DB_URL = process.env.DB_URL;

export const createUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.name || !req.body.email) {
            return res.status(400).send("Missing fields"); //todo show message on screen don't use .send()
        }
        const response = await fetch(DB_URL + 'users/', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            const message = await response.json();
            return res.status(400).send(message);
        }
        const user = await response.json();

        const token = jwt.sign(
            { _id: user.id.toString() },
            process.env.SECRET_KEY!,
        );

        res.cookie('token', token, { httpOnly: true });
        res.status(200); //.send({ token });
        res.redirect('/api/agendas/');
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getUserToken = async (req: Request, res: Response) => {
    try {
        const response = await fetch(DB_URL + 'users/');

        if (!response.ok) {
            return res.status(404).send();
        }

        const users = await response.json();

        if (!users) {
            return res.status(401).send();
        }

        let user;
        for (const u of users) {
            if (u.username === req.body.username) {
                user = u;
                break;
            }
        }

        if (!user) {
            return res.status(401).send();
        }
        const isPasswordMatch = bcrypt.compareSync(req.body.password, user.hashed_password);

        if (!isPasswordMatch) {
            return res.status(401).send({"message":"Wrong username or password"});
        }
        const token = jwt.sign(
            { _id: user.id.toString() },
            process.env.SECRET_KEY!,
        );
        res.cookie('token', token, { httpOnly: true });
        res.status(200); //.send({ token });
        res.redirect('/api/agendas/');
    } catch (error) {
        res.status(500).send(error);
    }
};