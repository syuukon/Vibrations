/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Pauses the current song. If it is already paused, this command will resume it.',
			category: 'Music',
			guildOnly: true,
			args: false
		});
	}

	async run(message) {
		const player = this.client.music.players.get(message.guild.id);
		const vChannel = message.member.voice;
		try {
			if (!player) return message.channel.send('There is nothing playing.');
			if (!vChannel) return message.channel.send('You must be in a voice channel to use this command.');

			if (player.playing) {
				player.pause(true);
				return message.channel.send(new MessageEmbed()
					.setColor('BLUE')
					.setDescription(`"${player.queue.current.title}" paused.\n\n=pause to resume.`)
				);
			} else {
				player.pause(false);
				return message.channel.send(new MessageEmbed()
					.setColor('BLUE')
					.setDescription(`"${player.queue.current.title}" unpaused.`)
				);
			}
		} catch (error) {
			console.error(error);
			return message.channel.send(`An error occured: "${error.message}`);
		}
	}

};
