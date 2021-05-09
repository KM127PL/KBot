const CE = require('../functions/CreateEmbed.js');

module.exports = {
	name: 'ping',
	description: 'Wyświetla ping bota',
	perms: "Brak",
	execute(message, args, client) {
		let embed = new CE("Ping 🏓", `Mój ping to ${Math.floor(Date.now() - message.createdTimestamp)}ms`);
		message.channel.send({ embed: embed.getEmbed() });
		message.react('840704663468376106');
		embed.destroy();
	},
};