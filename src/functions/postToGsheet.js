const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
require('dotenv').config(); 
const getCurrentDate = require('./utils');

// Load credentials from the JSON file obtained from the Google Developers Console
const credentials = JSON.parse(fs.readFileSync('credentials.json'));

// Create a new JWT client using the credentials
const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

// Set the ID of the Google Sheets you want to write to
const spreadsheetId = process.env.pinup_sheet_id;

// Function to append data to the Google Sheets
async function writeToSheet(discordUser, sheetName) {
    try {
        // Authorize the client and obtain an access token
        await client.authorize();

        // Create a new instance of Google Sheets API
        const sheets = google.sheets({ version: 'v4', auth: client });

        // Retrieve existing data to determine the next empty row
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A:B`,
        });

        // Calculate the next empty row by adding 1 to the length of existing data
        const nextRow = response.data.values ? response.data.values.length + 1 : 1;

        // Define the range where you want to append the data
        const range = `${sheetName}!A${nextRow}:B${nextRow}`;

        // Prepare the request body
        const requestBody = {
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource: {
                values: [
                    [discordUser, getCurrentDate()] // Data to be appended, formatted as an array
                ]
            }
        };

        // Make the append request to Google Sheets API
        const appendResponse = await sheets.spreadsheets.values.append(requestBody);
        console.log('Data appended successfully:', appendResponse.data);
    } catch (error) {
        console.error('Error appending data:', error);
    }
}

module.exports = writeToSheet;