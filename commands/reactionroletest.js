module.exports = {

    name: 'reactionroletest',
    description: 'Sets up a reaction role message',
    async execute(message,args, Discord, bot){
        const channel = '961078216901144626';
        const testRole = message.guild.roles.cache.find(role => role.name === "test");
        const testRoleEmoji = '<:phicc:960752738340311110>';

        let embed = new Discord.MessageEmbed()
            .setColor('#e43643')
            .setTitle('Select your role!')
            .setDescription("Choose <:phicc:960752738340311110> for the test role!");

        let messageEmbed = await message.channel.send({embeds: [embed]});
        messageEmbed.react(testRoleEmoji);

        bot.on('messageReactionAdd', async (reaction, user) => {
            console.log("test if entered reaction checker");
            if (reaction.message.partial) 
                await reaction.message.fetch(); 
                //message or message?
            if (reaction.partial)
                await reaction.fetch();
            if (user.bot)
                return;
            if (reaction.message.channel.id == channel){
                console.log("test if correct channel");
                console.log("reaction.emoji.name:");
                console.log(reaction.emoji.name);
                console.log("testRoleEmoji:");
                console.log(testRoleEmoji);
                console.log("testRoleEmoji.substring(2,7):");
                console.log(testRoleEmoji.substring(2,7));
                
                if (reaction.emoji.name === testRoleEmoji.substring(2,7)){
                    console.log("test if right emoji");
                    await reaction.message.guild.members.cache.get(user.id).roles.add(testRole);
                    console.log("${testRole} role added to ${reaction.message.guild.members.cache.get(user.id)}!");
                }
            } else {
                return;
            }
        })

        bot.on('messageReactionRemove', async(reaction, user) => {
            if (reaction.message.partial) 
                //message or message?
                await reaction.message.fetch(); 
            if (reaction.partial)
                await reaction.fetch();
            if (user.bot)
                return;
            if (reaction.message.channel.id == channel){
                if (reaction.emoji.name === testRoleEmoji.substring(2,7)){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(testRole);
                }
            } else {
                return;
            }
        })
    }
}