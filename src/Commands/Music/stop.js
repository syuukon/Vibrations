/* eslint-disable consistent-return */
const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Stops the player, destroying the queue.',
			category: 'Music',
			guildOnly: true,
			args: false
		});
	}

	async run(message) {
		try {
			const player = this.client.music.players.get(message.guild.id);
			if (!player) {
				if (message.guild.voice.channel) {
					return message.channel.send(new MessageEmbed()
						.setColor('PURPLE')
						.setDescription('Stopping.')
					);
				} else {
					return message.channel.send(new MessageEmbed()
						.setColor('PURPLE')
						.setDescription('Error: No song playing.')
					);
				}
			}

			if (player.queue && (player.queue.size || !player.queue.size)) {
				if (message.guild.voice.channel) {
					player.destroy();
					return message.channel.send(new MessageEmbed()
						.setColor('PURPLE')
						.setDescription('Successfully stopped.')
					);
				} else {
					return message.channel.send(new MessageEmbed()
						.setColor('PURPLE')
						.setDescription('Error: No song playing.')
					);
				}
			}
		} catch (err) {
			return console.log(err);
		}
	}

};
