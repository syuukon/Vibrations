const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['banish', 'die'],
			description: 'Kick the bot from the voice channel.',
			category: 'Music',
			guildOnly: true,
			args: false
		});
	}

	async run(message) {
		const { channel } = message.member.voice;
		try {
			if (!channel) return message.channel.send('You must be in a voice channel.');

			const player = this.client.music.players.get(message.guild.id);
			if (!player) return message.channel.send('Bot isn\'t connected to a voice channel.');
			if (channel.id !== player.voiceChannel) return message.channel.send('You must be in the same voice channel as the bot.');

			if (player) {
				player.destroy();
				return message.channel.send(`Exited channel: ${channel.name}.`);
			} else if (message.guild.voice.channel) {
				message.guild.voice.channel.leave();
				return message.channel.send(`Exited channel: ${channel.name}.`);
			}
		} catch (err) {
			console.error(err);
			return message.channel.send(`Error: ${err.message}.`);
		}
		return console.log(`Exited channel: ${channel.name}`);
	}

};
