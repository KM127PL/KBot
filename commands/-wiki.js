const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);
const wiki = require('wikijs').default;

function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

module.exports = {
	name: lang.commands.wiki.name,
	description: lang.commands.wiki.description,
	perms: lang.other.perms.none,
    aliases: ['wikipedia'],
	execute(message, args, client) {
        if(args.length == 0) {
            let error = new CE(lang.commands.wiki.title, `${lang.other['no-args']}`);
            message.channel.send({ embed: error.getEmbed() })
            message.react(process.env.BAD_EMOJI);
            return error.destroy();
        }
        let expr = "";
        for (let i = 0; i < args.length; i++) {
            expr = expr + " " + args[i];
        }
        try {
        wiki({ apiUrl: `https://${process.env.LANGUAGE.toLowerCase()}.wikipedia.org/w/api.php` })
            .page(expr)
            .then(page => page.info())
            .then((page) => {
                console.log(page);
                if(isEmpty(page)) {
                    let embed = new CE(`${lang.commands.wiki.title}`, `\`\`\`${lang.commands.wiki['does-not-exist']}\`\`\``);
                    message.channel.send({ embed: embed.getEmbed() });
                    message.react(process.env.BAD_EMOJI);
                    return embed.destroy();
                }
                if(page.nazwa) { // Article is a person.
                    let embed = new CE(`${lang.commands.wiki.title}`, `\`\`\`${page.nazwa}\n${page.pochodzenie}\n${page.rodzina}\`\`\``);
                }
                if(page.nazwa) { // Article is a music.
                    let embed = new CE(`${lang.commands.wiki.title}`, `\`\`\`${page.wykonawca} - ${page.wydany}\n${page.gatunek} - ${page.producent[0]}\`\`\``);
                }
                
                message.channel.send({ embed: embed.getEmbed() });
                message.react(process.env.GOOD_EMOJI);
                embed.destroy();
            });
        } catch(e) {
            let embed = new CE(`${lang.commands.wiki.title}`, `\`\`\`${lang.commands.wiki['does-not-exist']}\`\`\``);
            message.channel.send({ embed: embed.getEmbed() });
            message.react(process.env.BAD_EMOJI);
            return embed.destroy();
        }
		
	},
};