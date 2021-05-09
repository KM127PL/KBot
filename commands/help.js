const CE = require('../functions/CreateEmbed.js');
const fs = require('fs');
const lang = require(`../lang-${process.env.LANGUAGE}.json`);

module.exports = {
	name: lang.commands.help.name,
	description: lang.commands.help.description,
	perms: lang.other.perms.none,
	execute(message, args, client) {
		let embed = new CE(lang.commands.help.title, "");
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            embed.addField(`${command.name} (${command.perms})`, `\`\`\`${command.description}\`\`\``);
        }	
		message.channel.send({ embed: embed.getEmbed() });
		message.react(process.env.GOOD_EMOJI);
		return embed.destroy();
	},
};