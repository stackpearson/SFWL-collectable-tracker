const { SlashCommandBuilder } = require("discord.js");
const writeToSheet = require("../../functions/postToGsheet");
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('scifi')
        .setDescription('Track a scifi collection')
        .addStringOption(option => option.setName("name").setDescription(`This is a name`).setRequired(true)), 
    async execute(interaction) {
        try {
            const name = await interaction.options.getString("name");
            // Call writeToSheet function and handle any errors
            const tryWrite = await writeToSheet(name, 'scifi');
            if (tryWrite) {
                await interaction.reply({ content: `Scifi poster succesfully tracked https://tenor.com/bbiKC.gif`, ephemeral: true });
            } else {
                await interaction.reply({ content: `Sneaky Sneaky, you've already logged two collectables https://tenor.com/bczMQ.gif`, ephemeral: true });
            }
            
        } catch (error) {
            console.error('Error in writeToSheet:', error.message);
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}