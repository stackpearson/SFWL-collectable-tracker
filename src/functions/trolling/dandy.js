const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


// const specificUserId = '385926621984587777' //snowhound
// const specificChannelId = '1205666282775642142' //bot-testing
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

const keyWords = [
    'died', 'dead', 'heli', 'lizard', 'admin', 'coast', 'fuck', 'tissy', 'run', 'bm', 'pack', 'tea time'
]



async function dandyTroll(){
    client.once('ready', () => {
    });
    
    client.on('messageCreate', async message => {
        if (message.author.id === specificUserId && message.channel.id === specificChannelId) {
          const messageContent = message.content.toLowerCase();
          const containsKeyword = keyWords.some(keyword => messageContent.includes(keyword));

          if (containsKeyword) {
            const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
            await message.reply(randomReply);
          }
        }
      });
}



client.login(process.env.token);

module.exports = dandyTroll;