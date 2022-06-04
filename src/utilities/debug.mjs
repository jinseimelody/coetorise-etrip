import chalk from "chalk";

const log = (message, color) => {
    if (process.env.NODE_ENV === 'production')
        return;
    console.log(chalk[color](message));
};

export const info = (message) => {
    log(message, 'green');
};

export const focus = (message) => {
    log(message, 'yellow');
};