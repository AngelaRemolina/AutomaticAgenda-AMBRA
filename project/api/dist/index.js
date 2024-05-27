"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const app_1 = __importDefault(require("./app"));
const exphbs = require('express-handlebars');
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const express_1 = __importDefault(require("express"));
// Setting views directory
app_1.default.set('views', path_1.default.join(__dirname, 'views'));
// Setting up Handlebars
app_1.default.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(app_1.default.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app_1.default.get('views'), 'partials'),
    extname: '.hbs',
    helpers: handlebars_1.default
}));
// Setting view engine to Handlebars
app_1.default.set('view engine', '.hbs');
// Assets folder
app_1.default.use(express_1.default.static(path_1.default.join(__dirname, '/public')));
// Starting the server
app_1.default.listen(app_1.default.get('port'), () => {
    console.log(`Server is running on port ${app_1.default.get('port')}`);
});
