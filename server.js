const express = require('express');
require('express-async-errors');
require('dotenv').config();
const getPort = require('get-port');
const bodyParser = require('body-parser');
const logger = require('winston');
const path = require('path');
const bot = require('./controllers/bot_router.js');

const app = express();

const defaultPort = Number(process.env.PORT || 5000);

// json bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '512mb'}));


// static resources
app.use('/player', express.static(path.join(__dirname, 'public/web-player/dist/web-player')));

// routes
app.post('/', bot.respond());

app.get('/health', (req, res) => {
  res.send('Ok');
});

getPort(defaultPort).then((port) => {
  app.listen(port, async () => {
    logger.info(`listening on port ${port}`);
    if (process.env.NODE_ENV === 'development') {
      logger.info(`Navigate to http://localhost:${port} to use the application`);
    }
  });
});

module.exports = app;
