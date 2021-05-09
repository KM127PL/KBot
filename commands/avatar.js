const CE = require('../functions/CreateEmbed.js');
const fs = require('fs');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);
const fetch = require('node-fetch');

module.exports = {
	name: lang.commands.avatar.name,
	description: lang.commands.avatar.description,
	perms: lang.other.perms.none,
    aliases: ['icon'],
	execute(message, args, client) {
		const user = message.mentions.users.first() || message.author;
		let embed = new CE(`${lang.commands.avatar.title} ${user.username}`, ``);
	
		embed.setImage(user.avatarURL());
		message.channel.send({ embed: embed.getEmbed() });
		message.react(process.env.GOOD_EMOJI);
		return embed.destroy();
	}
};