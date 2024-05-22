"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    console.log(token);
    jsonwebtoken_1.default.verify(token.split(' ')[1], process.env.SECRET_KEY || 'secret', (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401).send({ message: 'Unauthorized!' });
            return;
        }
        req.userId = decoded?._id;
        next();
    });
}
exports.verifyToken = verifyToken;
