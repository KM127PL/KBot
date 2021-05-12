const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);

module.exports = {
	name: lang.commands.nuke.name,
	description: lang.commands.nuke.description,
    perms: lang.other.perms['manage-messages'],
	async execute(message, args, client) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            let embed = new CE(lang.other.moderator, lang.other['no-perm']);
            message.channel.send({ embed: embed.getEmbed() });
            message.react(process.env.BAD_EMOJI);
            return embed.destroy();
        }


        let channel = await message.channel.clone(undefined);
        message.channel.delete();


        let embed = new CE(lang.other.moderator, lang.commands.nuke.message);
        embed.setImage("https://i.pinimg.com/originals/47/12/89/471289cde2490c80f60d5e85bcdfb6da.gif");
        channel.send({ embed: embed.getEmbed() });
       // message.react(process.env.GOOD_EMOJI);
        return embed.destroy();
                
        
	},
};