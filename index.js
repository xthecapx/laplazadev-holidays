#!/usr/bin/env node

const axios = require('axios');
const { format } = require('date-fns');

async function getHolidays(country = 'CO', year = '2024') {
    try {
        const response = await axios.get(`https://world-holidays.info/api/holidays`, {
            params: { lang: 'en', country, year }
        });
        const holidays = response.data.holidays;
        holidays.forEach(holiday => {
            const formattedDate = format(new Date(holiday.date), 'MMMM dd, yyyy');
            console.log(`${holiday.name}: ${formattedDate}`);
        });
    } catch (error) {
        console.error('Error fetching holidays:', error);
    }
}

const args = process.argv.slice(2);
const yearArg = args.find(arg => /^\d{4}$/.test(arg));
const countryArg = args.find(arg => !/^\d{4}$/.test(arg));

getHolidays(countryArg, yearArg);