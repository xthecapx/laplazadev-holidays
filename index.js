#!/usr/bin/env node

import axios from 'axios';
import { format } from 'date-fns';
import chalk from 'chalk';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const matrixArt = `
  _           _____  _                _____             
 | |         |  ___|\| |              |  __ \\            
 | |     __ _| |___ | | __ _ ___ __ _| |  | | _____   __
 | |    / _\` |  ___|| |/ _\` |_  / _\` | |  | |/ _ \\ \\ / /
 | |___| (_| | |    | | (_| |/ / (_| | |__| |  __/\\ V / 
 |______\\__,_|_|    |_|\\__,_/___\\__,_|_____/ \\___| \\_/  
                                                        
                                            By Thecap                     
`;

async function typeWriter(text, speed = 10) {
    for (let i = 0; i < text.length; i++) {
        process.stdout.write(text[i]);
        await sleep(speed);
    }
    console.log();
}

async function getHolidays(country = 'CO', year = '2024') {
    try {
        console.log(chalk.green(matrixArt));
        await typeWriter(chalk.greenBright(`Accessing holiday database for ${country} in ${year}...`));
        await sleep(100);

        const response = await axios.get(`https://world-holidays.info/api/holidays`, {
            params: { lang: 'en', country, year }
        });
        const holidays = response.data.holidays;

        console.log(chalk.green('\n[HOLIDAY_DATA_STREAM]'));
        for (const holiday of holidays) {
            const formattedDate = format(new Date(holiday.date), 'yyyy.MMM.dd');
            const output = chalk.green(`[${formattedDate}] `) + chalk.greenBright(holiday.name);
            await typeWriter(output, 5);
        }
        console.log(chalk.green('[END_OF_STREAM]'));

    } catch (error) {
        console.error(chalk.redBright('Error accessing holiday database:'), error);
    }
}

const args = process.argv.slice(2);
const yearArg = args.find(arg => /^\d{4}$/.test(arg));
const countryArg = args.find(arg => !/^\d{4}$/.test(arg));

getHolidays(countryArg, yearArg);