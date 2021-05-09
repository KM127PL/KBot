const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang-${process.env.LANGUAGE}.json`);

module.exports = {
	name: lang.commands.ping.name,
	description: lang.commands.ping.description,
	perms: lang.other.perms.none,
	execute(message, args, client) {
		let embed = new CE("Ping 🏓", `${lang.commands.ping['my-ping']} ${Math.floor(Date.now() - message.createdTimestamp)}ms`);
		message.channel.send({ embed: embed.getEmbed() });
		message.react(process.env.GOOD_EMOJI);
		embed.destroy();
	},
};