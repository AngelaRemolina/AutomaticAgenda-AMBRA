"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const _routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// setting up the app
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
// routes
app.get('/', (req, res) => {
    res.send('server is running');
});
app.use('/api', _routes_1.default);
exports.default = app;
