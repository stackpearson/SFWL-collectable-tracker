const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions] });


// const specificUserId = '385926621984587777' //snowhound
// const specificUserId = '920868449742360576' //siryeetus
const specificUserId = '786324009842769920'; //stan

const specificChannelIds = [
    '1130323063473442856', //general-chernarus
    '1189292008393683034', //general-namalsk
    '1194968842338832495', //off topic
    '1205666282775642142' //bot-testing
]

const possibleReplies = [ 

    'Why are you the way you are?',
    'Will you ever learn?',
    'Brehhh',
    'https://tenor.com/bnfAb.gif',
    'https://tenor.com/bi5aV.gif',
    'https://tenor.com/8cSQ.gif',
    'https://tenor.com/bThIp.gif',
    'https://tenor.com/bLGNM.gif',
    'https://tenor.com/bR6oi.gif',
    'https://tenor.com/iAjrYrPejIS.gif',
    'https://tenor.com/boAJd.gif',
    'https://tenor.com/bWx2M.gif',
    'https://tenor.com/bjJ7B.gif',
    'https://tenor.com/bM1aJ.gif',
    'https://tenor.com/xLzM.gif',
    'https://tenor.com/OP58.gif',
    'https://tenor.com/bip8U.gif',
    'https://tenor.com/bL5ER.gif',
    'https://tenor.com/bfKYp.gif'
]


const keyWords = [
    '895068038645297162', //a:Pepe_triggered:
    '1109250557908111442', //:nodders:
    '749775606786556006', //:SadPepe:
    '1111408382969135124', //:_revolt:
    '987097350113738822', //:MA_26I7I2024:
    '1086306639461744712', //:_the_fella:
    '1138121557957414933', //:genhuh:
    '497568900205248547', //:SkeleWhy:
    '486903333798281216', //:attaboy:
    '1086309030261182554', //:_the_horror:
    '1011481834984587315', //:facepalm:
    '953279851891150908', //:sus:
    '608680075075911690', //:exo:
    '455533280947863572', //:OriginalPepe:
    '497568900205248547', //:SkeleWhy:
    '944402212757581855', //:pepecave:
    'https://tenor.com/view/que-gif-27530657', //dog gif
    'huh',
    'idk',
    'wdym',
    'wtf',
    'lol',
    'XD'
]

async function stanTroll() {
    client.once('ready', () => {});
    
    client.on('messageCreate', async message => {
        if (message.author.id === specificUserId && specificChannelIds.includes(message.channel.id)) {
            const messageContent = message.content.toLowerCase().trim();
            const reactionIDs = extractReactionIDs(messageContent);

            // Split message content into words based on spaces
            const words = messageContent.split(' ');

            // Check if the word count is greater than 1 or if any reaction is present
            if (words.length > 1 || (words.length > 1 && reactionIDs.length > 1)) {
                return; // Exit the function without replying
            }

            // Check if the message content matches any of the keywords individually
            if (reactionIDs.length === 1 || words.length === 1 || keyWords.includes(messageContent)) {
                const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
                await message.reply(randomReply);

                // get user info & time them out
                const guild = await client.guilds.fetch(process.env.guild_id);
                const member = await guild.members.fetch(message.author.id);

                if (member) {
                   member.timeout(10 * 60 * 1000, 'for being a filthy slut')
                }
            }
        }
    });
}

function extractReactionIDs(messageContent) {
    const regex = /<a?:[^:]+:([0-9]+)>/g;
    const matches = messageContent.matchAll(regex);
    const reactionIDs = [];

    for (const match of matches) {
        reactionIDs.push(match[1]);
    }

    return reactionIDs;
}

client.login(process.env.token);

module.exports = stanTroll;