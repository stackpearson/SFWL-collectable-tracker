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
                {name: 'Lewd Book 1', value: 'lewd-1'},
                {name: 'Lewd Book 2', value: 'lewd-2'},
                {name: 'Lewd Book 3', value: 'lewd-3'},
                {name: 'Lewd Book 4', value: 'lewd-4'},
                {name: 'Pablito Mat', value: 'pablito-mat'},
            )),
    async execute(interaction) {
        try {

            const collectableSheetName = await interaction.options.getString("collectable");
            const user = await interaction.options.getMentionable('user');
            const tryWrite = await writeToSheet(user.id, collectableSheetName);

            if (tryWrite) {
                await interaction.reply({ content: `${collectableSheetName} successfully tracked! https://tenor.com/bbiKC.gif`, ephemeral: false });
            } else {
                await interaction.reply({ content: `This user's cap has already been met for ${collectableSheetName}s https://tenor.com/bczMQ.gif`, ephemeral: false });
            }

        } catch (error) {
            console.error('Error in writeToSheet:', error.message);
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
};