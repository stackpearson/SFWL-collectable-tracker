const { SlashCommandBuilder } = require("discord.js");
const writeToSheet = require("../../functions/postToGsheet");
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collectables')
        .setDescription('Track a Collectable')
        .addMentionableOption(option => 
            option.setName('user')
                .setDescription('owner of collectable being tracked')
                .setRequired(true))
        .addStringOption(option => 
            option.setName("collectable")
            .setDescription("Select a collectable")
            .setRequired(true)
            .addChoices(
                {name: 'Fallout Pinup', value: 'pinup'},
                {name: 'Fallout Sci-Fi', value: 'scifi'},
                {name: 'Fallout Western', value: 'western'},
                {name: 'Sci-Fi Lewd', value: 'lewd-scifi'},
                {name: 'Zero Lewd', value: 'lewd-zero'},
                {name: 'Pablito Mat', value: 'pablito-mat'},
            )),
    async execute(interaction) {
        try {

            const collectableSheetName = await interaction.options.getString("collectable");
            const user = await interaction.options.getUser('user');
            const tryWrite = await writeToSheet(user.id, collectableSheetName);

            if (tryWrite) {
                await interaction.reply({ content: `${collectableSheetName} successfully tracked for ${user.username}! https://tenor.com/bbiKC.gif`, ephemeral: false });
            } else {
                await interaction.reply({ content: `${user.username} has already met the cap for ${collectableSheetName}s https://tenor.com/bczMQ.gif`, ephemeral: false });
            }

        } catch (error) {
            console.error('Error in writeToSheet:', error.message);
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
};