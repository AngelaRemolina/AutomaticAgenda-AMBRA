import { Request, Response } from 'express';
import fetch from 'node-fetch';

const MODEL_URL = process.env.MODEL_URL;
const DB_URL = process.env.DB_URL;

export const setActivity = async (req: Request, res: Response) => {
    try {
        if (!req.body.name || !req.body.description) {
            return res.status(400).send();
        }

        const response_model = await fetch(MODEL_URL + '/feedback', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers['authorization']!
            },
        });

        if (!response_model.ok) {
            return res.status(400).send();
        }

        const response_db = await fetch(DB_URL + '/activities', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers['authorization']!
            },
        });

        if (!response_db.ok) {
            return res.status(400).send();
        }

        const activity = await response_db.json();

        res.status(201).send(activity);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getRecommendations = async (req: Request, res: Response) => {
    try {

        const response = await fetch(MODEL_URL + '/recommendations', {
            headers: {
                'Authorization': req.headers['authorization']!
            }
        });

        if (!response.ok) {
            return res.status(404).send();
        }

        const recommendations = await response.json();

        if (!recommendations) {
            return res.status(404).send();
        }
        res.status(200).send(recommendations);
    } catch (error) {
        if ((<Error>error).name === 'CastError') {
            return res.status(404).send();
        }

        res.status(500).send(error);
    }
};