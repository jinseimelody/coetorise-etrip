import 'dotenv/config';
import express from 'express';
import {queryParser} from 'express-query-parser';
import https from 'https';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';
import * as rfs from 'rotating-file-stream';
import {Server as SocketServer} from 'socket.io';

import apiRoute from '~/routes';
import {dns} from '~/utilities';
import middleware from '~/middleware';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true
  })
);

// config logging
let logging = morgan('dev');
if (process.env.LOGGING_MODE === 'combined') {
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
  });
  logging = morgan('combined', {stream: accessLogStream});
}
app.use(logging);

// config cross side request origin
const corsDelegete = (req, callback) => {
  const allowList = ['http://localhost:3000', 'http://192.168.1.9:3000'];
  const origin = req.header('Origin');
  callback(null, {
    origin: allowList.indexOf(origin) > -1,
    optionsSuccessStatus: 200
  });
};
app.use(cors(corsDelegete));

// config server
dns.rewire();
let server = http.createServer(app);
let port = 80;
if (process.env.SSL_MODE === 'enabled') {
  port = 443;
  server = https.createServer(
    {
      cert: fs.readFileSync(path.join(__dirname, process.env.CERT_PATH)),
      key: fs.readFileSync(path.join(__dirname, process.env.KEY_PATH)),
      passphrase: process.env.PASSPHRASE
    },
    app
  );
}
server.listen(port, process.env.HOST, () => {
  console.log(`Example app listening on port ${port}`);
});

// config socket
const io = new SocketServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const onConnection = socket => {
  console.log(`Count: ${io.engine.clientsCount} - Socket connected: ${socket.id}`);

  socket.on('message', data => {
    socket.broadcast.emit('message', data);
  });
};
io.on('connection', onConnection);

app.use(middleware.reqInterceptor);

// config routing
app.use('/api', apiRoute);

// error handler
app.use(middleware.errorHandler);
