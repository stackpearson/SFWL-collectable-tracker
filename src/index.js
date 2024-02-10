const { Client, IntentsBitField} = require('discord.js');
require('dotenv').config();
const token = process.env.botToken;
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.login(token);