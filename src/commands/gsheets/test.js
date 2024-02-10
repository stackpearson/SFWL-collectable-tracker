const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('this is your test'),
    async execute(interaction, client) {
        await interaction.reply({content: 'bot is runnin'});
    }
}