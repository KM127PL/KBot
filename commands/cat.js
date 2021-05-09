const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);
const fetch = require('node-fetch');

module.exports = {
	name: lang.commands.cat.name,
	description: lang.commands.cat.description,
	perms: lang.other.perms.none,
	async execute(message, args, client) {

		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		let embed = new CE(`${lang.commands.cat.title}`, ``);

	
		embed.setImage(file);
		message.channel.send({ embed: embed.getEmbed() });
		message.react(process.env.GOOD_EMOJI);
		return embed.destroy();

	}
};