const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lizard')
    .setDescription('fucking menace'),
    async execute(interaction, client) {
        await interaction.reply({content: 'https://tenor.com/bCJZ2.gif'});
    }
}