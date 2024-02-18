const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config(); 

// Load credentials and setup auth
const credentials = JSON.parse(fs.readFileSync('credentials.json'));
const spreadsheetId = process.env.pinup_sheet_id;
const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

async function checkGsheet(userId) {
    try {
        await client.authorize();
        const sheets = google.sheets({ version: 'v4', auth: client });

        // Fetching sheet names
        const { data: { sheets: sheetList } } = await sheets.spreadsheets.get({
            spreadsheetId,
        });

        const result = [];

        for (const sheet of sheetList) {
            const sheetName = sheet.properties.title;
            const { data: { values } } = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${sheetName}!A:B`,
            });

            const dates = values
                .filter(row => row[0] === userId)
                .map(row => row[1]);

            if (dates.length > 0) {
                result.push({ sheetName, dates });
            }
        }
        return result;
        
    } catch (err) {
        console.error('Error occurred while checking dates:', err);
        throw err;
    }
}

    module.exports = checkGsheet;