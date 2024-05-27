"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgenda = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const DB_URL = process.env.DB_URL;
const getAgenda = async (req, res) => {
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
exports.getAgenda = getAgenda;
