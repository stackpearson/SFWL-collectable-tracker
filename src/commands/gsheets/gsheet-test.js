const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const postToGsheet = require('../../functions/postToGsheet');
const writeToSheet = require("../../functions/postToGsheet");
require('dotenv').config();
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('pinups')
    .setDescription('Track a pinup collection')
    .addStringOption(option => option.setName("name").setDescription(`This is a name`).setRequired(true)), 
    async execute(interaction) {
 
        await interaction.reply({ content: `This is working`,ephemeral: true });
        const name = interaction.options.getString("name");
        const postToGsheet = writeToSheet(name, 'pinups')
        
    }
}