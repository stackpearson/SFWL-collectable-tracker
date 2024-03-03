const { SlashCommandBuilder } = require("discord.js");
require('dotenv').config();
const generateRoast = require('../../functions/roastGenerator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roast')
        .setDescription('Roast someone *NSFW*'),
        // .addMentionableOption(option => 
        //     option.setName('user')
        //         .setDescription('Person to be roasted')
        //         .setRequired(true)),

    async execute(interaction) {
        try {
            // const user = await interaction.options.getMember('user');
            const insult = await generateRoast();

            if (insult) {
                console.log('insult: ', insult)
                // await interaction.reply({ content: `${user.toString()} ${insult.data.insult}`, ephemeral: false });
                await interaction.reply({ content: `check console`, ephemeral: false });
            } else {
                await interaction.reply({ content: `That didn't work`, ephemeral: true });
            }

        } catch (error) {
            console.error('Error in roasting, please try again or contact snow:', error.message);
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
};