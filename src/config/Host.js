import https from 'https';
import path from 'path';
import {networkInterfaces} from 'os';
import fs from 'fs';

const WINDOWS_HOST_PATH = 'C:/Windows/System32/drivers/etc/hosts';

const configLocalDns = () => {
  const filtered = networkInterfaces()['Wi-Fi'].filter(x => x.address.startsWith('192.168.1.'));
  const ip = filtered.pop().address;
  fs.readFile(WINDOWS_HOST_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const content = data.replaceAll(/192\.168\.1\.\d+/g, `${ip}`);
    fs.writeFileSync(WINDOWS_HOST_PATH, content);
  });
};

const Host = {};
Host.build = app => {
  configLocalDns();

  switch (process.env.SSL_MODE) {
    case 'enabled':
      const cert = fs.readFileSync(path.join(global.dirname, process.env.CERT_PATH));
      const key = fs.readFileSync(path.join(global.dirname, process.env.KEY_PATH));
      const server = https.createServer({cert: cert, key: key, passphrase: process.env.PASSPHRASE}, app);
      server.listen(443, process.env.HOST, () => {
        console.log(`Example app listening on port 443`);
      });
      return server;
    case 'disabled':
    default:
      app.listen(80, process.env.HOST, () => {
        console.log(`Example app listening on port 80`);
      });
      return app;
  }
};

export default Host;
