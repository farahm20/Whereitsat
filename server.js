const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('./routes/login');
const createRouter = require('./routes/create');
const accountRouter = require('./routes/account');

const app = express();

const database = require('./models/database-operations');
const endpoints = require('./Routes/endpoints');


const port = process.env.PORT || 8000;

endpoints(app);

app.use(express.static('view'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/whereitsat/account', accountRouter);
app.use('/whereitsat/create', createRouter);
app.use('/whereitsat/account', accountRouter);


app.listen(8000, () => {
    console.log('Server is running on port:', port);
    database.initiateDatabase();
});