const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang-${process.env.LANGUAGE}.json`);
const math = require(`mathjs`);

module.exports = {
	event: 'on-message-sent',
	execute(message, args, client) {
        if(message.content.startsWith("$")) return;
        if(message.channel.id == process.env.MATH_CHANNEL) {
            try {
                expr = args;
                let embed = new CE(`${lang.commands.math.title}`, `\`\`\`${expr} = ${math.evaluate(expr)}\`\`\``);
                message.channel.send({ embed: embed.getEmbed() });
                message.react(process.env.GOOD_EMOJI);
                return embed.destroy();
            } catch (e) {
                expr = args;
                let embed = new CE(`${lang.commands.math.title}`, `\`\`\`${lang.events['undefined-math-exp']}\`\`\``);
                embed.setFooter(lang.events['math-footer-bad-exp']);
                message.channel.send({ embed: embed.getEmbed() });
                message.react(process.env.BAD_EMOJI);
                return embed.destroy();
            }
        }
		
	},
};