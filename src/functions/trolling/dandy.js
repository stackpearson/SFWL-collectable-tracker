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
    'https://tenor.com/bvXRc.gif',
    'https://tenor.com/bZIoP.gif',
    'https://tenor.com/bQM8f.gif',
    'https://tenor.com/b1LOh.gif',
    'https://tenor.com/bIg7P.gif',
    'https://tenor.com/bjja4.gif',
    'https://tenor.com/bmKlF.gif',
    'https://tenor.com/nmCTK5b84l6.gif',
    'https://tenor.com/o5sEs0BVz8c.gif',
    'https://tenor.com/bXXS2.gif',
    'https://tenor.com/bvATx.gif',
    'https://tenor.com/b1AJI.gif',
    'https://tenor.com/rQoEnk8G4ge.gif',
    'https://tenor.com/SPXl.gif',
    'https://tenor.com/bXT34.gif',
    'https://tenor.com/bCE9a.gif',
    'https://tenor.com/bCL1b.gif',
    'https://tenor.com/bKeH2.gif',
    'https://tenor.com/byMz0.gif'

]

const keyWords = [
    'died', 'dead', 'heli', 'admin', 'coast', 'tissy', 'run', 'bm', 'pack', 'dropped', 'crash', 'lag', 'log'
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