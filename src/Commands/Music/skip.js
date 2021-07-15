const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['next'],
			description: 'Skip the current song to play the next in the queue.',
			category: 'Music',
			guildOnly: true,
			args: false
		});
	}

	async run(message) {
		try {
			const { channel } = message.member.voice;
			const player = this.client.music.players.get(message.guild.id);

			if (!channel) return message.channel.send('You must be connected to a voice channel to use this command.');
			if (channel.id !== player.voiceChannel) return message.channel.send('You must be in the same voice channel as the bot.');
			if (!player.playing) return message.channel.send('Nothing playing.');
			else player.stop();

			return message.channel.send(new MessageEmbed()
				.setColor('PURPLE')
				.setDescription(`Skipped ${player.queue.current.title}.`)
			);
		} catch (error) {
			console.error(error);
			return message.channel.send(new MessageEmbed()
				.setColor('PURPLE')
				.setDescription(`Error occured: ${error.message}`)
			);
		}
	}

};
