const { SlashCommandBuilder } = require("discord.js");
const checkGsheet = require('../../functions/checkGsheet');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check-collectable')
        .setDescription('See what collectables a user has')
        .addMentionableOption(option => 
            option.setName('user')
                .setDescription('owner of collectables being tracked')
                .setRequired(true)),
    async execute(interaction) {
        try {

            const user = await interaction.options.getUser('user');
            const tryCheck = await checkGsheet(user.id);

            const collectables = tryCheck.map(({ sheetName, dates }) =>
        `- **${sheetName}** on these date(s): ${dates.join(', ')}`
    ).join('\n');

            if (collectables) {
                console.log('user: ', user)
                await interaction.reply({ content: `${user.username} has the following collectables: \n \n${collectables}`, ephemeral: false });
            } else {
                await interaction.reply({ content: `${user.username} has no logged collectables`, ephemeral: false });
            }

        } catch (error) {
            console.error('Error in checkSheet:', error.message);
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
};