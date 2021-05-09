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
		let embed = new CE(`${lang.commands.math.title}`, `\`\`\`${expr} = ${math.evaluate(expr)}\`\`\``);
		message.channel.send({ embed: embed.getEmbed() });
		message.react(process.env.GOOD_EMOJI);
		return embed.destroy();
	},
};