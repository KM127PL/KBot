const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);

module.exports = {
	name: lang.commands.clear.name,
	description: lang.commands.clear.description,
    perms: lang.other.perms['manage-messages'],
	execute(message, args, client) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            let embed = new CE(lang.other.moderator, lang.other['no-perm']);
            message.channel.send({ embed: embed.getEmbed() });
            message.react(process.env.BAD_EMOJI);
            return embed.destroy();
        } else if (args.length > 0) {
            let count = parseInt(args[0]);
            if(!isNaN(count) && count < 101 && count > 0) {
                message.channel.bulkDelete(count + 1, true)
                
                let embed = new CE(lang.other.moderator, lang.commands.clear.deleted.replace('{count}', count + 1));
		        message.channel.send({ embed: embed.getEmbed() });
		        message.react(process.env.GOOD_EMOJI);
		        return embed.destroy();
            }
                
        }
        
        let embed = new CE(lang.other.moderator, lang.commands.clear['how-much']);
        message.channel.send({ embed: embed.getEmbed() });
        message.react(process.env.BAD_EMOJI);
        return embed.destroy();
        
	},
};