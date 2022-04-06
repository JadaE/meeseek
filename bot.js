require('dotenv').config();
// var Discord = require('discord.io');
const Discord = require('discord.js');
// const logger = require('winston');
const auth = require('./auth.json');
const fs = require('fs');

// Configure logger settings
// logger.remove(logger.transports.Console);
// logger.add(new logger.transports.Console, {
//     colorize: true
// });
// logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true,
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_EMOJIS_AND_STICKERS"],
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

bot.commands = new Discord.Collection();

//another tutorial
//no clue what all this is for...
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command);
}

//Login as bot
bot.login(process.env.DISCORD_TOKEN);
bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});
// bot.on('ready', function (evt) {
//     logger.info('Connected');
//     logger.info('Logged in as: ');
//     logger.info(bot.username + ' - (' + bot.id + ')');
// });

const prefix = '!!'
// //pt 2

bot.on('messageCreate', msg  => {
    if(!msg.content.startsWith(prefix) || msg.author.bot)
        return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'reactionroletest') {
        bot.commands.get('reactionroletest').execute(msg, args, Discord, bot);
    } else if (command === 'rulereader'){
        bot.commands.get('rulereader').execute(msg, args, Discord, bot);
    } else {
        console.log(command);
    }
});

// bot.on('interactionCreate', async interaction => {
//     if(!interaction.isCommand()) 
//         return;

// 	const { commandName } = interaction;

// 	if (commandName === 'react') {
// 		const message = await interaction.reply({ content: 'You make me smile!', fetchReply: true });
// 		// message.react('😄');
//         message.react("\:joy:")
// 	}
    
//     if (commandName === 'react-custom') {
// 		const message = await interaction.reply({ content: 'I love Phicc!', fetchReply: true });
//         // const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'phicc');
//         // message.react(reactionEmoji);
// 		message.react('<:phicc:960752738340311110>');
// 	}
//   });


// bot.on('message', function ( msg) {
//     if(!msg.content.startsWith(prefix) || msg.author.bot)
//         return;
//     const args = msg.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();
//     if (command === 'ping') {
//         console.log(msg.content);
//         msg.reply('pong');
//     }
//      else  {
//         msg.reply('you summoned me?<:phicc:960752738340311110>');
//     }
//     // Our bot needs to know if it will execute a command
//     // It will listen for messages that will start with `!!`
//     console.log(message);

//     if (message.substring(0,2) == '!!') {
//         var args = message.substring(1).split(' ');
//         var cmd = args[0];

//         args = args.splice(1);

//         switch(cmd) {
//             // !ping
//             case 'ping':
//                 bot.sendMessage({
//                     to: channelID,
//                     message: 'Pong!'
//                 });
//             break;
//             // Just add any case commands if you want to..

//         }
//     }
// });



