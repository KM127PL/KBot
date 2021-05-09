const Discord = require('discord.js');

let isCreated = false;
let embed;

class Embed {
	/**
	 * Creates an embed
	 * @param {string} title title of the embed
	 * @param {string} description description of the embed
	 * @param {string} color color (in hex) of the embed
	 */
	constructor(title, description, color) {
		this.title = title || ''; // Default title
		this.description = description || ''; // Default text
		this.color = color || '#2F3136' // Default color
	}
	
	/**
	 * Adds a field to the embed.
	 * @param {string} name title of the field
	 * @param {string} value description of the field.
	 */
	addField( name, value ) {
		if(!isCreated)
			this.createEmbed();

		embed.addFields({name: name, value: value});
	}

	/** Set the image
	 * 
	 */
	setImage( url ) {
		if(!isCreated)
			this.createEmbed();

		embed.setImage(url);
	}

	/**
	 * Create the embed
	 */
	createEmbed() {
		embed = new Discord.MessageEmbed();
		embed.setTitle(this.title);
		embed.setColor(this.color);
		embed.setDescription(this.description);
		isCreated = true;
	}

	/**
	 * Returns the embed.
	 * @returns The embed
	 */
	getEmbed() {
		if(!isCreated)
			this.createEmbed();
		
		return embed;
		
	}

	/**
	 * Destroys the embed
	 */
	destroy() {
		embed = null;
		isCreated = false;
	}
}

module.exports = Embed;