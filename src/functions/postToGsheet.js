const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config(); 
const getCurrentDate = require('./utils');

// Load credentials and setup auth
const credentials = JSON.parse(fs.readFileSync('credentials.json'));
const spreadsheetId = process.env.pinup_sheet_id;
const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

async function writeToSheet(discordUser, sheetName) {
    try {
        // Authenticate
        await client.authorize();
        const sheets = google.sheets({ version: 'v4', auth: client });

        // Retrieve existing data to check if the user already exists
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A:A`, // Check only the first column (Discord users)
        });

        // Check if the user already exists in the sheet
        const existingUserRows = response.data.values ? response.data.values.filter(row => row[0] === discordUser) : [];
        if (existingUserRows.length > 1) {
            throw new Error(`User has already logged 2 ${sheetName}`);
        }

        // Find next empty row and append data
        const nextRow = response.data.values ? response.data.values.length + 1 : 1;
        const range = `${sheetName}!A${nextRow}:B${nextRow}`;

        // Prepare and submit data
        const requestBody = {
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource: {
                values: [ [String(discordUser), getCurrentDate()] ]
              
            }
        };

        await sheets.spreadsheets.values.append(requestBody);
        console.log(`tracked ${sheetName} for user ${discordUser}`)
        return true;

    } catch (error) {
        console.log('error: ', error.message)
        return false;
    }
}

    module.exports = writeToSheet;