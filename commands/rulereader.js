module.exports = {

    name: 'rulereader',
    description: 'Sets up a rule reader role message & roles',
    async execute(message,args, Discord, bot){
        const channel = '900792495686971493';
        const ruleReaderRole = message.guild.roles.cache.find(role => role.name === "rule reader");
        const phiccEmoji = '<:phicc:959616585855795210>'; 

        let embed = new Discord.MessageEmbed()
            .setColor('#9fe2bf')
            .setTitle('I have read the above rules')
            .setDescription("React with <:phicc:959616585855795210> to acknowledge!");

        let messageEmbed = await message.channel.send({embeds: [embed]});
        messageEmbed.react(phiccEmoji);

        bot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) 
                await reaction.message.fetch(); 
                //message or message?
            if (reaction.partial)
                await reaction.fetch();
            if (user.bot)
                return;
            if (reaction.message.channel.id == channel){
                if (reaction.emoji.name === phiccEmoji.substring(2,7)){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(ruleReaderRole);
                }
            } else {
                return;
            }
        })

        bot.on('messageReactionRemove', async(reaction, user) => {
            if (reaction.message.partial) 
                await reaction.message.fetch(); 
            if (reaction.partial)
                await reaction.fetch();
            if (user.bot)
                return;
            if (reaction.message.channel.id == channel){
                if (reaction.emoji.name === phiccEmoji.substring(2,7)){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(ruleReaderRole);
                }
            } else {
                return;
            }
        })
    }
}