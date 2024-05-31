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
        const responseUser = await (0, node_fetch_1.default)(DB_URL + 'users/' + req.userId);
        if (!responseUser.ok) {
            return res.status(404).send();
        }
        const agenda = await responseUser.json();
        const events = agenda.activities; //activities that user has scheduled
        const responseModel = await (0, node_fetch_1.default)(MODEL_URL + '/recommendations/' + req.userId);
        if (!responseModel.ok) {
            return res.status(404).send();
        }
        let recomIDs = await responseModel.json();
        const responseActs = await (0, node_fetch_1.default)(DB_URL + 'activities/');
        if (!responseActs.ok) {
            return res.status(404).send();
        }
        const activities = await responseActs.json();
        let recommendations = [];
        for (const id of recomIDs) {
            const responseRecom = await (0, node_fetch_1.default)(DB_URL + 'activities/' + id);
            if (!responseRecom.ok) {
                return res.status(404).send();
            }
            let recom = await responseRecom.json();
            // handlebars is not taking the change
            // recom.date_day = (new Date(recom.start_time)).toDateString();
            // recom.start_time = (new Date(recom.start_time)).toLocaleTimeString('en-US');
            // recom.end_time = (new Date(recom.end_time)).toLocaleTimeString('en-US');
            recommendations.push(recom);
        }
        // console.log(recommendations);
        res.render('calendar/calendar', { events: events, activities: activities, recommendations: recommendations });
        res.status(200); //.send(agendas);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getAgenda = getAgenda;
