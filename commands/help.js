const CE = require('../functions/CreateEmbed.js');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'Wyświetla tą liste komend',
	perms: "Brak",
	execute(message, args, client) {
		let embed = new CE("**Pomoc**", "");
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