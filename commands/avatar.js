const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);

module.exports = {
	name: lang.commands.avatar.name,
	description: lang.commands.avatar.description,
	perms: lang.other.perms.none,
    aliases: ['icon'],
	execute(message, args, client) {
		const user = message.mentions.users.first() || message.author;
		let embed = new CE(`  `, ``);
	
		embed.setImage(user.avatarURL());
        embed.setFooter(`${lang.commands.avatar.title} ${user.username}`)
		message.channel.send({ embed: embed.getEmbed() });
		message.react(process.env.GOOD_EMOJI);
		return embed.destroy();
	}
};