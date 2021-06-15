/* eslint-disable consistent-return */
const Command = require('../../Structures/Command');

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
			const player = this.client.music.create({
				guild: message.guild.id,
				textChannel: message.channel.id,
				voiceChannel: message.member.voice.channel.id
			});
			if (!player) {
				if (message.guild.voice.channel) {
					message.guild.voice.channel.leave();
					return message.channel.send('Successfully stopped. Leaving the voice channel.');
				} else {
					return message.channel.send('Error: No song playing.');
				}
			}

			if (player.queue && (player.queue.size || !player.queue.size)) {
				if (message.guild.voice.channel) {
					message.guild.voice.channel.leave();
					player.destroy();
					return message.channel.send('Successfully stopped. Leaving the voice channel.');
				} else {
					return message.channel.send('Error: No song playing.');
				}
			}
		} catch (err) {
			return console.log(err);
		}
	}

};
