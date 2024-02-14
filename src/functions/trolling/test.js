const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const snowId = '385926621984587777';
const possibleReplies = [
    'https://tenor.com/bWq7Q.gif',
    'https://tenor.com/bCNLB.gif',
    'https://tenor.com/blLZh.gif',
    'https://tenor.com/blnG7.gif',
    'https://tenor.com/bFeYr.gif',
    'https://tenor.com/btsQY.gif',
    'https://tenor.com/bWlyM.gif',
    'https://tenor.com/dN5FVKvswNs.gif',
    'https://tenor.com/bmXkQ.gif',
    'https://tenor.com/bIkiy.gif',
    'https://tenor.com/b07O8.gif',
    'https://tenor.com/bPFfV.gif',
    'https://tenor.com/bvXRc.gif'
]

async function snowTest() {
    client.on('messageCreate', async message => {
        // Check if the message content is "!snowTest"
        if (message.content === "!snowStatus") {
            // If the message author is yourself (the bot)
            if (message.author.id === snowId) {
                // Reply to yourself with a different message
                await message.reply("status - 🟢");
            } else {
                // Reply to everyone else with a different message
                await message.reply("https://tenor.com/6KEk.gif");
            }
        }
    });
}



client.login(process.env.token);

module.exports = snowTest;