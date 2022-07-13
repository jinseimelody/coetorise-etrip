import chalk from 'chalk';

const log = (message, color) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(chalk[color](message));
};

chalk.info = message => {
  log(message, 'green');
};

chalk.focus = message => {
  log(message, 'yellow');
};

export default chalk;
