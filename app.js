require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.DISCORD_PREFIX;
const db = require('quick.db');
const CE = require('./functions/CreateEmbed.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const lang = require(`./lang-${process.env.LANGUAGE}.json`);
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.on('message', message => {
	if(message.author.bot) return;
	if(!db.has(`prefix.${message.guild.id}`)) { // If the guild does not have a prefix, set it.
		db.set(`prefix.${message.guild.id}`, `${prefix}`);
		console.log(`Setting prefix of ${message.guild} to ${prefix}`);
	}

	if (message.mentions.has(client.user)) { // If the bot was mentioned, send the prefix.
		let embed = new CE(`${lang.commands.prefix.name}`, `${lang.commands.prefix['my-prefix-here']}` + db.get(`prefix.${message.guild.id}`));

		message.react(process.env.GOOD_EMOJI);
		message.channel.send({ embed: embed.getEmbed() });
		
		return embed.destroy();
	}

	let p = db.get(`prefix.${message.guild.id}`);

	const args = message.content.slice(p.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	if(client.events.get('on-message-sent')) {
		client.events.get('on-message-sent').execute(message, message.content, client);
	}

	if (!client.commands.has(command) || !message.content.startsWith(p)) return;
	try {
		client.commands.get(command).execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply(lang.other.error);
	}
});

client.on('ready', () => {
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
		console.log(`[BOT] Registering command ${command.name.toLowerCase()} from ${file}`)
	}
	for (const file of eventFiles) {
		const event = require(`./events/${file}`);
		client.events.set(event.event.toLowerCase(), event);
		console.log(`[BOT] Registering event ${event.event.toLowerCase()} from ${file}`)
	}
    console.log(`[BOT] Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

if(process.env.HEROKU_BYPASS_ENABLED) {
	const express = require('express');
	const app = express();

	app.get('/', (req, res) => {
		return res.send(`<div style="align-self: center;text-align: center;margin-top: 24.6%;">Hello!</div>`);
	});
	
	app.listen(process.env.PORT);
}