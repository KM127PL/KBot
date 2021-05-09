require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.DISCORD_PREFIX;
const db = require('quick.db');
const CE = require('./functions/CreateEmbed.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();


client.on('message', message => {
	if(!db.has(`prefix.${message.guild.id}`)) { // If the guild does not have a prefix, set it.
		db.set(`prefix.${message.guild.id}`, `${prefix}`);
		console.log(`Setting prefix of ${message.guild} to ${prefix}`);
	}

	if (message.mentions.has(client.user)) { // If the bot was mentioned, send the prefix.
		let embed = new CE("Prefix", "Mój prefix tutaj to: " + db.get(`prefix.${message.guild.id}`));

		message.react(process.env.GOOD_EMOJI);
		message.channel.send({ embed: embed.getEmbed() });
		
		return embed.destroy();
	}

	let p = db.get(`prefix.${message.guild.id}`);
	if (!message.content.startsWith(p) || message.author.bot) return;

	const args = message.content.slice(p.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

client.on('ready', () => {
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}	
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);