import fs from 'fs';
import {networkInterfaces} from 'os';

const WINDOWS_HOST_PATH = 'C:/Windows/System32/drivers/etc/hosts';

const Host = {};
Host.build = os => {
  switch (os) {
    case 'windows':
      const filtered = networkInterfaces()['Wi-Fi'].filter(x =>
        x.address.startsWith('192.168.1.')
      );
      const ip = filtered.pop().address;
      fs.readFile(WINDOWS_HOST_PATH, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const content = data.replaceAll(/192\.168\.1\.\d+/g, `${ip}`);
        fs.writeFileSync(WINDOWS_HOST_PATH, content);
      });
      break;
    default:
      throw Error(`os: ${os} is invalid`);
  }
};

export default Host;
