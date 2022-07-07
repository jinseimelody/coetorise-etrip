import 'dotenv/config';
import express from 'express';
import https from 'https';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import apiRoute from './src/routes/router.mjs';
import {Server} from 'socket.io';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// config for logging
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs')
});
switch (process.env.NODE_ENV) {
  case 'production':
    app.use(morgan('combined', {stream: accessLogStream}));
    break;
  case 'development':
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
switch (process.env.SSL_MODE) {
  case 'enabled':
    const cert = fs.readFileSync(path.join(__dirname, process.env.CERT_PATH));
    const key = fs.readFileSync(path.join(__dirname, process.env.KEY_PATH));
    const secureServer = https.createServer(
      {cert: cert, key: key, passphrase: process.env.PASSPHRASE},
      app
    );
    secureServer.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });

    const io = new Server(secureServer, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    });
    // eslint-disable-next-line no-unused-vars
    io.on('connection', socket => {
      console.log('a user connected: ' + socket.id);

      socket.on('send_message', data => {
        socket.broadcast.emit('receive_message', data);
      });
    });
    break;
  case 'disabled':
  default:
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
      console.log(
        `env:` +
          JSON.stringify({
            env: process.env.NODE_ENV,
            port: process.env.PORT,
            host: process.env.HOST,
            sslMode: process.env.SSL_MODE
          })
      );
    });
    break;
}

// config routing
app.use('/api', apiRoute);

app.get('/', async (_, res) => {
  res.send('You are in Root');
});

app.get('*', (_, res) => {
  res.send('Oop 404');
});
