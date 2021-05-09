const CE = require('../functions/CreateEmbed.js');
const db = require('quick.db');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);

module.exports = {
	name: lang.commands.prefix.name,
	description: lang.commands.prefix.description,
    perms: lang.other.perms['manage-messages'],
	execute(message, args, client) {
        if(args.length > 0) {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) {
                let embed = new CE(lang.other.moderator, lang.other['no-perm']);
		        message.channel.send({ embed: embed.getEmbed() });
		        message.react(process.env.BAD_EMOJI);
                return embed.destroy();
            }
            db.set(`prefix.${message.guild.id}`, args[0]);

            let embed = new CE(lang.other.moderator, lang.commands.prefix['set-to'] + args[0]);
		    message.channel.send({ embed: embed.getEmbed() });
		    message.react(process.env.GOOD_EMOJI);
            return embed.destroy();
        }


        let embed = new CE(lang.other.moderator, lang.commands.prefix['my-prefix-here'] + db.get(`prefix.${message.guild.id}`));
		message.channel.send({ embed: embed.getEmbed() });
		message.react(process.env.GOOD_EMOJI);
        return embed.destroy();
	},
};