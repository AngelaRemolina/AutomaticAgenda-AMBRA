"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_routes_1 = __importDefault(require("./user.routes"));
const agenda_routes_1 = __importDefault(require("./agenda.routes"));
const model_routes_1 = __importDefault(require("./model.routes"));
router.use('/users', user_routes_1.default);
router.use('/agendas', agenda_routes_1.default);
router.use('/models', model_routes_1.default);
// test calendar view
router.get('/calendar', (req, res) => {
    res.render("calendar/calendar");
});
exports.default = router;
