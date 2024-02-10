const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
require('dotenv').config();
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('gsheet')
    .setDescription('testing shit out')
    .addStringOption(option => option.setName("name").setDescription(`This is a name`).setRequired(true))
    .addStringOption(option => option.setName("age").setDescription(`This is a age`).setRequired(true))
    .addStringOption(option => option.setName("email").setDescription(`This is a email`).setRequired(true)),
    async execute(interaction) {
 
        await interaction.reply({ content: `This is working`,ephemeral: true });
 
        const name = interaction.options.getString("name");
        const age = interaction.options.getString("age");
        const email = interaction.options.getString("email");
 
        axios.post("https://sheetdb.io/api/v1/a15m5kb096oy5", {
            data: {
                name: `${name}`,
                age: `${age}`,
                email: `${email}`
            }
        })
    }
}