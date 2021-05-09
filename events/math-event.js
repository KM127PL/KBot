const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang-${process.env.LANGUAGE}.json`);
const math = require(`mathjs`);

module.exports = {
	event: 'on-message-sent',
	execute(message, args, client) {
        if(message.channel.id == 840991453572628520) {
            try {
                expr = args;
                let embed = new CE(`${lang.commands.math.title}`, `\`\`\`${expr} = ${math.evaluate(expr)}\`\`\``);
                message.channel.send({ embed: embed.getEmbed() });
                message.react(process.env.GOOD_EMOJI);
                return embed.destroy();
            } catch (e) {
                expr = args;
                let embed = new CE(`${lang.commands.math.title}`, `\`\`\`Nieznana funckja matematyczna.\`\`\``);
                message.channel.send({ embed: embed.getEmbed() });
                message.react(process.env.BAD_EMOJI);
                return embed.destroy();
            }
        }
		
	},
};