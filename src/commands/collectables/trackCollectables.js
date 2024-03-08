const { SlashCommandBuilder } = require("discord.js");
const writeToSheet = require("../../functions/postToGsheet");
require('dotenv').config();

const collectableRoles = {
    'pinup': '1180641401831166014',
    'scifi': '1180641401831166014',
    'western': '1180641401831166014',
    'lewd-scifi': '1204969563528241212',
    'lewd-zero': '1182158742159114250',
    'pablito-mat': '1182158216621199432'
}

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
            const roleId = collectableRoles[collectableSheetName];
            const member = await interaction.guild.members.fetch(user.id);

            if (!member.roles.cache.has(roleId)) {
                await member.roles.add(roleId)
            } console.log('user role already applied')

            const tryWrite = await writeToSheet(user.id, collectableSheetName);

            if (tryWrite) {
                await interaction.reply({ content: `${collectableSheetName} successfully tracked & role applied (if applicable) for ${user.username}! https://tenor.com/bbiKC.gif`, ephemeral: false });
            } else {
                await interaction.reply({ content: `${user.username} has already met the cap for ${collectableSheetName}s https://tenor.com/bczMQ.gif`, ephemeral: false });
            }

        } catch (error) {
            console.error('Error in writeToSheet:', error.message);
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
};