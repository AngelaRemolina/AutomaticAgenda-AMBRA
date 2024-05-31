"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = exports.setActivity = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const MODEL_URL = process.env.MODEL_URL;
const DB_URL = process.env.DB_URL;
const setActivity = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!req.body.act_id) {
            return res.status(400).send();
        }
        const actId = req.body.act_id.toString();
        const userId = req.userId;
        const response_model = await (0, node_fetch_1.default)(MODEL_URL + '/feedback', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, act_id: actId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        if (!response_model.ok) {
            return res.status(400).send();
        }
        const response_db = await (0, node_fetch_1.default)(DB_URL + 'schedule', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, act_id: actId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        if (!response_db.ok) {
            return res.status(400).send();
        }
        res.status(201);
        res.redirect('/api/agendas/');
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.setActivity = setActivity;
const getRecommendations = async (req, res) => {
    try {
        const response = await (0, node_fetch_1.default)(MODEL_URL + '/recommendations', {
            headers: {
                'Authorization': req.headers['authorization']
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
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getRecommendations = getRecommendations;
