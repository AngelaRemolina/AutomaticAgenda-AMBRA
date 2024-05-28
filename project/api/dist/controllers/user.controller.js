"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserToken = exports.createUser = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DB_URL = process.env.DB_URL;
const createUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.name || !req.body.email) {
            return res.status(400).send("Missing fields"); //todo show message on screen don't use .send()
        }
        const response = await (0, node_fetch_1.default)(DB_URL + 'users/', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            const message = await response.json();
            return res.status(400).send(message);
        }
        const user = await response.json();
        // create user agenda
        const responseAgenda = await (0, node_fetch_1.default)(DB_URL + 'agendas/', {
            method: 'POST',
            body: JSON.stringify({
                "start_time": "7:00",
                "end_time": "17:00",
                "owner_id": user.id
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!responseAgenda.ok) {
            const message = await response.json();
            return res.status(400).send(message);
        }
        const agenda = await responseAgenda.json();
        if (!agenda) {
            return res.status(400).send("Error creating user agenda");
        }
        const token = jsonwebtoken_1.default.sign({ _id: user.id.toString() }, process.env.SECRET_KEY);
        res.cookie('token', token, { httpOnly: true });
        res.status(200); //.send({ token });
        res.redirect('/api/agendas/');
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.createUser = createUser;
const getUserToken = async (req, res) => {
    try {
        const response = await (0, node_fetch_1.default)(DB_URL + 'users/');
        if (!response.ok) {
            return res.status(404).send();
        }
        const users = await response.json();
        if (!users) {
            return res.status(401).send();
        }
        let user;
        for (const u of users) {
            if (u.username === req.body.username) {
                user = u;
                break;
            }
        }
        if (!user) {
            return res.status(401).send();
        }
        // todo: when DB hashes the password here it would have to unhash it to do comparison
        // const isPasswordMatch = req.body.password === user.password;
        // console.log(req.body.password);
        // console.log(user);
        // todo: this fails because DB is not returning the password,
        // in the mean time I will set a unique static password for testing
        const isPasswordMatch = req.body.password === "123456789";
        if (!isPasswordMatch) {
            return res.status(402).send({ "message": "Wrong username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user.id.toString() }, process.env.SECRET_KEY);
        res.cookie('token', token, { httpOnly: true });
        res.status(200); //.send({ token });
        res.redirect('/api/agendas/');
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getUserToken = getUserToken;
