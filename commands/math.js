const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);
const math = require(`mathjs`);


module.exports = {
	name: lang.commands.math.name,
	description: lang.commands.math.description,
	perms: lang.other.perms.none,
	execute(message, args, client) {
		let expr = "";
		for (let i = 0; i < args.length; i++) {
			expr = expr + " " + args[i];
		}
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
	},
};