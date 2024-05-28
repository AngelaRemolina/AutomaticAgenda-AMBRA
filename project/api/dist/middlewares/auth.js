"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    const tokenCookie = req.headers.cookie?.split('=')[1];
    if (!token && !tokenCookie) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    if (!token) {
        token = tokenCookie;
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'secret', (err, decoded) => {
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
