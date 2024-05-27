import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import app from './app';
const exphbs = require('express-handlebars');
import path from 'path';
import handlebarsHelpers from 'handlebars';
import express from 'express';

// Setting views directory
app.set('views', path.join(__dirname, 'views'));

// Setting up Handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: handlebarsHelpers
}));

// Setting view engine to Handlebars
app.set('view engine', '.hbs');

// Assets folder
app.use(express.static(path.join(__dirname, '/public')));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});