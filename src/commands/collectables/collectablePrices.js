const { SlashCommandBuilder } = require("discord.js");
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collectable-prices')
        .setDescription('See breakdown of collectable prices'),
    async execute(interaction) {
        try {
            await interaction.reply({ content: '__**Scifi Mats: 18 count w/ shelf**__\nLimits: 2x per season\nPrize: $80M\n\n__**Fallout Lunchboxes (100 cards each)**__\n*Scifi | Western | Pinup*\nLimits: 2x per season\nPrize: $60M\n\n__**Scifi Lewd: 100 cards each**__\nLimits: 2x per season\nPrize: $60M\n\n__**Zeros Waifus: 200 cards**__\nLimits: 2x per season\nPrize: $120M\n\n', ephemeral: false });
        } catch (error) {
            console.error('Error in collectable price check:', error.message);
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
};