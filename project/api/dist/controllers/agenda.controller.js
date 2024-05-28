"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgenda = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const DB_URL = process.env.DB_URL;
const MODEL_URL = process.env.MODEL_URL;
const getAgenda = async (req, res) => {
    try {
        const responseAgendas = await (0, node_fetch_1.default)(DB_URL + 'agendas/' + req.userId);
        if (!responseAgendas.ok) {
            return res.status(404).send();
        }
        let agenda = await responseAgendas.json();
        const events = agenda.activities; //activities that user has scheduled
        const responseModel = await (0, node_fetch_1.default)(MODEL_URL + '/recommendations/' + req.userId);
        if (!responseModel.ok) {
            return res.status(404).send();
        }
        let recomIDs = await responseModel.json();
        let activities = [];
        for (const id of recomIDs) {
            const responseRecom = await (0, node_fetch_1.default)(DB_URL + 'activities/' + id);
            if (!responseRecom.ok) {
                return res.status(404).send();
            }
            let recom = await responseRecom.json();
            activities.push(recom);
        }
        res.render('calendar/calendar', { events: events, activities: activities });
        res.status(200); //.send(agendas);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getAgenda = getAgenda;
