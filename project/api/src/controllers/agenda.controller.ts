import { Request, Response } from 'express';
import fetch from 'node-fetch';

const DB_URL = process.env.DB_URL;
const MODEL_URL = process.env.MODEL_URL;

export const getAgenda = async (req: Request, res: Response) => {
    try {
        const responseUser = await fetch(DB_URL + 'users/' + req.userId);
        if (!responseUser.ok) {
            return res.status(404).send();
        }
        let agenda = await responseUser.json();
        const events = agenda.activities; //activities that user has scheduled

        const responseModel = await fetch(MODEL_URL + '/recommendations/' + req.userId);
        if (!responseModel.ok) {
            return res.status(404).send();
        }
        let recomIDs = await responseModel.json();
        let activities = [];
        for (const id of recomIDs) {
            const responseRecom = await fetch(DB_URL + 'activities/' + id);
            if (!responseRecom.ok) {
                return res.status(404).send();
            }
            let recom = await responseRecom.json();
            activities.push(recom);
        }
        res.render('calendar/calendar', { events: events, activities: activities });
        res.status(200)//.send(agendas);
    } catch (error) {
        res.status(500).send(error);
    }
};
