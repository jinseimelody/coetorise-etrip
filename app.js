import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import {Server as SocketServer} from 'socket.io';

import apiRoute from '~/routes';
import {Host} from '~/config';

const app = express();
global.dirname = path.dirname(fileURLToPath(import.meta.url));

// config for logging
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs')
});
switch (process.env.LOGGING_MODE) {
  case 'combined':
    app.use(morgan('combined', {stream: accessLogStream}));
    break;
  case 'dev':
    app.use(morgan('dev'));
    break;
}

// config for cors
const allowlist = ['http://localhost:3000', 'http://127.0.0.1:8080'];
const corsDelegete = (req, callback) => {
  const origin = req.header('Origin');
  callback(null, {
    origin: allowlist.indexOf(origin) > -1,
    optionsSuccessStatus: 200
  });
};
app.use(cors(corsDelegete));

// config json
app.use(express.json());

// config ssl
const server = Host.build(app);

// config socket
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// config socket events
const bookingHandler = require('~/controllers/booking.controller.js');
const onConnection = socket => {
  console.log('A user connected: socket_id ' + socket.id);

  bookingHandler(io, socket);
};
io.on('connection', onConnection);

// config routing
app.use('/api', apiRoute);

app.get('/', async (_, res) => {
  res.send('You are in Root');
});

app.get('*', (_, res) => {
  res.send('Oop 404');
});
