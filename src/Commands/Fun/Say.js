const Command = require('../../Structures/Command');
const discordTTS = require('discord-tts');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['speak', 'tts'],
			description: 'Annoy people with spoken tts that they can\'t disable.',
			category: 'Fun',
			NSFW: false,
			args: true,
			guildOnly: true
		});
	}

	// eslint-disable-next-line consistent-return
	run(message) {
		const broadcast = this.client.voice.createBroadcast();
		var channelId = message.member.voice.channelID;
		var channel = this.client.channels.cache.get(channelId);
		if (message.content.length > 200) {
			return message.channel.send(`Message too long: ${message.content.length} - please try again with less characters. (200 limit)`);
		}
		channel.join().then(connection => {
			broadcast.play(discordTTS.getVoiceStream(message.content.substr(5)));
			connection.play(broadcast);
		});
	}

};
