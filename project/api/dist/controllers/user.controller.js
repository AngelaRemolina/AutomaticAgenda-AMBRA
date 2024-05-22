"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserToken = exports.createUser = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DB_URL = process.env.DB_URL;
// declare module "express-serve-static-core" {
//     interface Request {
//         userId: string
//     }
// }
const createUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.name) {
            return res.status(400).send();
        }
        const response = await (0, node_fetch_1.default)(DB_URL + '/users', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            return res.status(400).send();
        }
        const user = await response.json();
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.createUser = createUser;
const getUserToken = async (req, res) => {
    try {
        const response = await (0, node_fetch_1.default)(DB_URL + '/users/' + req.body.username);
        if (!response.ok) {
            return res.status(404).send();
        }
        const user = await response.json();
        if (!user) {
            return res.status(401).send();
        }
        const isPasswordMatch = req.body.password === user.password;
        if (!isPasswordMatch) {
            return res.status(402).send();
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
        res.status(200).send({ token });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getUserToken = getUserToken;
