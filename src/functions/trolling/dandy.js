const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const specificUserId = '414886679267115009';
const specificChannelId = '1130323063473442856';
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

async function dandyTroll(){
    client.once('ready', () => {
    });
    
    client.on('messageCreate', async message => {
        // console.log('Message received from:', message.channel.id);
    
        // Check if the message is from the specific user and in the specific channel
        if (message.author.id === specificUserId && message.channel.id === specificChannelId) {
            // Fetch recent messages in the channel (including the current message)
            const messages = await message.channel.messages.fetch({ limit: 50 });
    
            // Filter out messages sent by the specific user
            const userMessages = messages.filter(msg => msg.author.id === specificUserId);
    
            // Count the number of messages sent by the specific user
            const messageCount = userMessages.size;
    
            if (messageCount === 50) {
                const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
                await message.reply(randomReply);
            } else if (messageCount > 50) {
                return
            }
        }
    });
}



client.login(process.env.token);

module.exports = dandyTroll;