const CE = require('../functions/CreateEmbed.js');
const db = require('quick.db');
require('dotenv').config();

module.exports = {
	name: 'prefix',
	description: 'Wyświetla oraz zmienia prefix bota.',
    perms: 'Zarządzanie Wiadomościami',
	execute(message, args, client) {
        if(args.length > 0) {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) {
                let embed = new CE("Moderator", "Nie masz permisji do używania tej komendy!");
		        message.channel.send({ embed: embed.getEmbed() });
		        message.react(process.env.BAD_EMOJI);
                return embed.destroy();
            }
            db.set(`prefix.${message.guild.id}`, args[0]);

            let embed = new CE("Moderator", "Ustawiono prefix na: " + args[0]);
		    message.channel.send({ embed: embed.getEmbed() });
		    message.react(process.env.GOOD_EMOJI);
            return embed.destroy();
        }


        let embed = new CE("Moderator", "Mój prefix tutaj to: " + db.get(`prefix.${message.guild.id}`));
		message.channel.send({ embed: embed.getEmbed() });
		message.react(process.env.GOOD_EMOJI);
        return embed.destroy();
	},
};