const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


// const specificUserId = '385926621984587777' //snowhound
// const specificChannelId = '1205666282775642142' //bot-testing
const specificUserId = '414886679267115009';
// const specificChannelId = '1130323063473442856'; // general
const specificChannelId = '1194968842338832495'; //off topic
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
    'https://tenor.com/byMz0.gif',
    //2.17.24
    'Frosty Mate',
    'This guy...',
    'https://tenor.com/bm7f4.gif',
    'https://tenor.com/bHIug.gif',
    'https://tenor.com/baj9o.gif',
    'https://tenor.com/iAjrYrPejIS.gif',
    'https://tenor.com/ufqzuajEQ82.gif',
    'https://tenor.com/joGNeMhxrWP.gif',
    'https://tenor.com/ipSZqHNtZ51.gif',
    'https://tenor.com/bH9ZV.gif',
    'https://tenor.com/bBnTu.gif',
    'https://tenor.com/oQ4t.gif',
    'https://tenor.com/biquB.gif',
    'https://tenor.com/bG5vv.gif',
    'https://tenor.com/bMuT8.gif',
    'https://tenor.com/btieq.gif',
    'https://tenor.com/eHIB7d0rFCg.gif',
    'https://tenor.com/8p1O.gif',
    'https://tenor.com/bip5A.gif',
    'https://tenor.com/bmIcw.gif',
    'https://tenor.com/bHUK7.gif'

]

const knownKeywords = [
  'bm', 'log', 'died', 'admin'
]

const keyWords = [
    'dead', 'fuck', 'boi', 'rank', 'beating', 'bed', 'shit', 'gm', 'heli', 'coast', 'tissy', 'run', 'pack', 'dropped', 'crash', 'lag', 'control','dragon', 'wolves', 'wolf', 'land', 'base', 'trader', 'control', 'lewd'
]

const ignoredKeywords = {};

async function dandyTroll() {
    client.once('ready', () => {});
    
    client.on('messageCreate', async message => {
        if (message.author.id === specificUserId && message.channel.id === specificChannelId) {
            const messageContent = message.content.toLowerCase();
            const currentTimestamp = Date.now();

            // Filter out ignored keywords
            const activeKeywords = keyWords.filter(keyword => {
                const ignoredTime = ignoredKeywords[keyword];
                if (!ignoredTime) return true;
                // Check if the 10-minute duration has passed
                return currentTimestamp - ignoredTime > 51 * 60 * 1000;
            });

            for (const keyword of activeKeywords) {
                if (messageContent.includes(keyword)) {
                    const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
                    await message.reply(randomReply);
                    
                    // Mark the keyword as ignored for the next 10 minutes
                    ignoredKeywords[keyword] = currentTimestamp;
                    break;
                }
            }
        }
    });
}

client.login(process.env.token);

module.exports = dandyTroll;