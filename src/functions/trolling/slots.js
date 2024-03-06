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
    'https://tenor.com/banUJ.gif',
    'https://tenor.com/bTqun.gif',
    'https://tenor.com/bvh1h.gif',
    'https://tenor.com/pHiNB7HOsKP.gif',
    'https://tenor.com/uWDn.gif',
    'https://tenor.com/9lTR.gif',
    'https://tenor.com/5SiJ.gif',
    'https://tenor.com/Z7JT.gif',
    'https://tenor.com/bpKRP.gif',
    'https://tenor.com/bmXfS.gif',
    'https://tenor.com/buU5W.gif',
    'Yes, slots indeed',
    'Slots my friend, slots',
    'SLOTS',
    'Someone say slots?',
    'Slots burddderrr',
    'Slots, Thots, and shots brudder'
]

const slotsReactId = '1182091267132362763';

const ignoredChannels = [
'1186843199965237308', //cherno-player-market
'1145102903003074672' //ingame-chat
]


function slots(){
    client.once('ready', () => {
    });
    client.on('messageCreate', message => {
        if (ignoredChannels.includes(message.channel.id)) return;
        if (message.author.bot) return;
        const messageContent = message.content.toLocaleLowerCase();
        if (messageContent.includes('!slots')) {
            const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
            message.reply(randomReply);
            message.react(slotsReactId)
        }
      });
}



client.login(process.env.token);

module.exports = slots;