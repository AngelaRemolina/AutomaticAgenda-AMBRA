"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgenda = exports.updateAgenda = exports.getAgendas = exports.getAgenda = exports.createAgenda = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const DB_URL = process.env.DB_URL;
const createAgenda = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description) {
            return res.status(400).send();
        }
        const response = await (0, node_fetch_1.default)(DB_URL + '/agendas', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            return res.status(400).send();
        }
        const agenda = await response.json();
        res.status(201).send(agenda);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.createAgenda = createAgenda;
const getAgenda = async (req, res) => {
    try {
        const response = await (0, node_fetch_1.default)(DB_URL + '/agendas/' + req.params.id);
        if (!response.ok) {
            return res.status(404).send();
        }
        const agenda = await response.json();
        if (!agenda) {
            return res.status(404).send();
        }
        res.status(200).send(agenda);
    }
    catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).send();
        }
        res.status(500).send(error);
    }
};
exports.getAgenda = getAgenda;
const getAgendas = async (req, res) => {
    try {
        const response = await (0, node_fetch_1.default)(DB_URL + '/agendas');
        if (!response.ok) {
            return res.status(404).send();
        }
        const agendas = await response.json();
        res.status(200).send(agendas);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getAgendas = getAgendas;
const updateAgenda = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description) {
            return res.status(400).send();
        }
        const response = await (0, node_fetch_1.default)(DB_URL + '/agendas/' + req.params.id, {
            method: 'PATCH',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            return res.status(400).send();
        }
        const agenda = await response.json();
        res.status(200).send(agenda);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.updateAgenda = updateAgenda;
const deleteAgenda = async (req, res) => {
    try {
        const response = await (0, node_fetch_1.default)(DB_URL + '/agendas/' + req.params.id, {
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
    }
    catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).send();
        }
        res.status(500).send(error);
    }
};
exports.deleteAgenda = deleteAgenda;
