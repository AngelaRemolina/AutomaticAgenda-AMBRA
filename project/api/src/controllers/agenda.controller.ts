import { Request, Response } from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

const DB_URL = process.env.DB_URL;

export const getAgenda = async (req: Request, res: Response) => {
    try {
        
        const response = await fetch(DB_URL + 'agendas/');

        if (!response.ok) {
            return res.status(404).send();
        }

        const agendas = await response.json();

        res.render('calendar/calendar')
        res.status(200)//.send(agendas);
    } catch (error) {
        res.status(500).send(error);
    }
};
