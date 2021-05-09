const CE = require('../functions/CreateEmbed.js');

module.exports = {
	name: 'clear',
	description: 'Czyści wiadomości na kanale',
    perms: "Zarządzanie Wiadomościami",
	execute(message, args, client) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            let embed = new CE("Moderator", "Nie masz permisji do używania tej komendy!");
            message.channel.send({ embed: embed.getEmbed() });
            message.react(process.env.BAD_EMOJI);
            return embed.destroy();
        } else if (args.length > 0) {
            let count = parseInt(args[0]);
            if(!isNaN(count) && count < 101 && count > 0) {
                message.channel.bulkDelete(count + 1, true)
                
                let embed = new CE("Moderator", `Usunięto \`${count}\` wiadomości! 🧹`);
		        message.channel.send({ embed: embed.getEmbed() });
		        message.react('840704663468376106');
		        return embed.destroy();
            }
                
        }
        
        let embed = new CE("Moderator", "Musisz podać ile wiadomości mam usunąć!");
        message.channel.send({ embed: embed.getEmbed() });
        message.react(process.env.BAD_EMOJI);
        return embed.destroy();
        
	},
};