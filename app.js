require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const CE = require('./functions/CreateEmbed.js');
const { ifError } = require('assert');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const lang = require(`./lang/lang-${process.env.LANGUAGE}.json`);
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.disabled_commands = new Discord.Collection();

client.on('message', (message) => {
	if(message.author.bot || message.channel.type === 'dm') return; // Cancel if the author is a bot or channel is dm
	if(!db.has(`prefix.${message.guild.id}`)) return db.set(`prefix.${message.guild.id}`, `${process.env.DISCORD_PREFIX}`); // Set the guild prefix if none is present

	if (message.mentions.has(client.user)) { // If the bot was mentioned, send the prefix.
		let embed = new CE(`${lang.commands.prefix.name}`, `${lang.commands.prefix['my-prefix-here']}` + db.get(`prefix.${message.guild.id}`));

		message.react(process.env.GOOD_EMOJI);
		message.channel.send({ embed: embed.getEmbed() });
		
		return embed.destroy();
	}

	let prefix = db.get(`prefix.${message.guild.id}`); // Get prefix from the db

	const args = message.content.slice(prefix.length).trim().split(/ +/); // Create arguments
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	client.events.get('on-message-sent').execute(message, message.content, client);
	
	if(client.disabled_commands.get(commandName.toLowerCase())) return;
	if (!message.content.startsWith(prefix.toLowerCase())) return;
	try {
		if(client.disabled_commands.get(command.name.toLowerCase())) return;
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply(lang.other.error);
	}

});

/*
	Register commands and events
*/
client.on('ready', () => {
	for (const file of commandFiles) {
		if(file.startsWith('-')) {
			const command = require(`./commands/${file}`);
			client.disabled_commands.set(command.name.toLowerCase(), true);
			continue;
		};
		const command = require(`./commands/${file}`);

		client.commands.set(command.name.toLowerCase(), command);
		console.log(`[BOT] Registering command ${command.name.toLowerCase()} from ${file}`)
	}
	for (const file of eventFiles) {
		if(file.startsWith('-')) continue;
		const event = require(`./events/${file}`);
		client.events.set(event.event.toLowerCase(), event);
		console.log(`[BOT] Registering event ${event.event.toLowerCase()} from ${file}`)
	}
    console.log(`[BOT] Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);