const brainly = require('brainly-scraper-v2');
const parseLatex = require('../functions/Parsers.js');
require('dotenv').config();
const CE = require('../functions/CreateEmbed.js');
const lang = require(`../lang/lang-${process.env.LANGUAGE}.json`);

module.exports = {
	name: lang.commands.brainly.name,
	description: lang.commands.brainly.description,
	perms: lang.other.perms.none,
	execute(message, args, client) {
        if(args.length == 0) {
            let error = new CE(lang.commands.brainly.title, `${lang.other['no-args']}`);
            message.channel.send({ embed: error.getEmbed() })
            message.react(process.env.BAD_EMOJI);
            return error.destroy();
        }
        let loading = new CE(lang.commands.brainly.loading, '');
        message.channel.send({ embed: loading.getEmbed() }).then(msg => {
            
            loading.destroy();
            let expr = "";
            for (let i = 0; i < args.length; i++) {
                expr = expr + " " + args[i];
            }
            
            try {
                brainly(expr, 2, process.env.LANGUAGE.toLowerCase()).then(resp => {
                    let embed = new CE(lang.commands.brainly.title, '');
                    for(let i = 0; i < resp.data.length; i++) {
                            embed.addField(`${i + 1}. ${parseLatex(resp.data[i].pertanyaan)}`, `\`\`\`${parseLatex(resp.data[i].jawaban[0].text)}\`\`\``);
                            embed.setFooter(`${resp.data[i].jawaban[0].media}`);
                        }
                    
                    msg.edit({ embed: embed.getEmbed() });
		            message.react(process.env.GOOD_EMOJI);
		            embed.destroy();
                });
            } catch(e) {
                console.log(e);
            }
        });
	},
};