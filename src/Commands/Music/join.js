const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['summon', 'summ'],
			description: 'Summon the bot to your current voice channel.',
			category: 'Music',
			guildOnly: true,
			args: false
		});
	}

	async run(message) {
		try {
			const { channel } = message.member.voice;
			if (!channel) return message.channel.send('You must be in a voice channel.');
			if (!channel.permissionsFor(this.client.user).has('CONNECT')) return message.channel.send(`Bot doesn't have the required permissions to join channel: ${channel.name}`);

			const player = this.client.music.players.get(message.guild.id);
			if (!player || (player && player.state === 'DISCONNECTED')) {
				this.client.music.create({
					guild: message.guild.id,
					textChannel: message.channel.id,
					voiceChannel: message.member.voice.channel.id,
					selfDeafen: true
				}).connect();
				return message.channel.send(`Connected to channel: ${channel.name}.`);
			} else if (!message.guild.voice.channel) {
				message.guild.voice.channel.join();
				return message.channel.send(`Connected to channel: ${channel.name}`);
			} else {
				return message.channel.send('Already connected to a voice channel.');
			}
		} catch (err) {
			console.error(err);
			return message.channel.send(`Error: ${err.message}.`);
		}
	}

};
