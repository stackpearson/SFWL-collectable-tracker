const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions] });
const possibleReplies = [
    'https://tenor.com/4sP6.gif',
    'https://tenor.com/zZG4.gif',
    'https://tenor.com/9uKj.gif',
    'https://tenor.com/bDEyS.gif',
    'https://tenor.com/ih7rrPf10mX.gif',
    'https://tenor.com/72NW.gif',
    'https://tenor.com/bpa3A.gif',
    'https://tenor.com/9JSh.gif',
    'https://tenor.com/boGRV.gif',
    'https://tenor.com/5UPx.gif',
    'https://tenor.com/bAMx2.gif',
    'https://tenor.com/bZLYx.gif',
    'https://tenor.com/beR4p.gif',
    'https://tenor.com/vK5L.gif',
    'https://tenor.com/bnpHd.gif',
    'https://tenor.com/bWPQq.gif',
    'https://tenor.com/bFg80.gif',
    'https://tenor.com/bkDCC.gif',
    'Yes, slots indeed',
    'Slots my friend, slots',
    'SLOTS',
    'Someone say slots?'
]

const slotsReactId = '1182091267132362763'
const inGameChatId = '1145102903003074672';



function slots(){
    client.once('ready', () => {
    });
    client.on('messageCreate', message => {
        const messageContent = message.content.toLocaleLowerCase();
        if (message.channel.id === inGameChatId) return;
        if (message.author.bot) return;
        if (messageContent.includes('slots')) {
            const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
            message.reply(randomReply);
            message.react(slotsReactId)
        }
      });
}



client.login(process.env.token);

module.exports = slots;