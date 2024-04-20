import { Request, Response } from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

const DB_URL = process.env.DB_URL;


export const createAgenda = async (req: Request, res: Response) => {
    try {
        if (!req.body.name || !req.body.description) {
            return res.status(400).send();
        }

        const response = await fetch(DB_URL + '/agendas', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return res.status(400).send();
        }

        const agenda = await response.json();

        res.status(201).send(agenda);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAgenda = async (req: Request, res: Response) => {
    try {

        const response = await fetch(DB_URL + '/agendas/' + req.params.id);

        if (!response.ok) {
            return res.status(404).send();
        }

        const agenda = await response.json();

        if (!agenda) {
            return res.status(404).send();
        }
        res.status(200).send(agenda);
    } catch (error) {
        if ((<Error>error).name === 'CastError') {
            return res.status(404).send();
        }

        res.status(500).send(error);
    }
};

export const getAgendas = async (req: Request, res: Response) => {
    try {

        const response = await fetch(DB_URL + '/agendas');

        if (!response.ok) {
            return res.status(404).send();
        }

        const agendas = await response.json();

        res.status(200).send(agendas);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateAgenda = async (req: Request, res: Response) => {
    try {
        if (!req.body.name || !req.body.description) {
            return res.status(400).send();
        }

        const response = await fetch(DB_URL + '/agendas/' + req.params.id, {
            method: 'PATCH',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return res.status(400).send();
        }

        const agenda = await response.json();

        res.status(200).send(agenda);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAgenda = async (req: Request, res: Response) => {
    try {

        const response = await fetch(DB_URL + '/agendas/' + req.params.id, {
            method: 'DELETE',
        });

        if (!response.ok) {
            return res.status(404).send();
        }

        const agenda = await response.json();

        if (!agenda) {
            return res.status(404).send();
        }

        res.status(200).send(agenda);
    } catch (error) {
        if ((<Error>error).name === 'CastError') {
            return res.status(404).send();
        }
        res.status(500).send(error);
    }
};