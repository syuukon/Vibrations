const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['np'],
			description: 'Display info for the song that is currently playing.',
			category: 'Music',
			guildOnly: true,
			args: false
		});
	}

	async run(message) {
		try {
			const player = this.client.music.players.get(message.guild.id);
			if (!player || player.queue.size === 0 || (player.position === 0 && !player.playing)) return message.channel.send('Nothing is playing in this server.');

			const { channel } = message.member.voice;
			if (!channel) return message.channel.send('You must be connected to a voice channel.');

			if (channel.id !== player.voiceChannel) return message.channel.send('You must be in the same voice channel as the bot.');

			const video = player.queue.current;
			let description;

			if (video.isStream) {
				description = 'Live Stream';
			} else {
				const part = Math.floor((player.position / video.duration) * 30);
				const positionObj = {
					seconds: Math.floor((player.position / 1000) % 60),
					minutes: Math.floor((player.position / (1000 * 60)) % 60),
					hours: Math.floor((player.position / (1000 * 60 * 60)) % 24)
				};
				const totalDurationObj = {
					seconds: Math.floor((video.duration / 1000) % 60),
					minutes: Math.floor((video.duration / (1000 * 60)) % 60),
					hours: Math.floor((video.duration / (1000 * 60 * 60)) % 24)
				};
				description = `${`${'─'.repeat(part)}⚪${'─'.repeat(30 - part)}`}\n\n\`${this.formatDuration(positionObj)} / ${this.formatDuration(totalDurationObj)}\``;
			}

			const videoEmbed = new MessageEmbed()
				.setThumbnail(`https://i.ytimg.com/vi/${video.identifier}/hqdefault.jpg`)
				.setColor('BLUE')
				.setTitle(video.title)
				.setDescription(description)
				.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			return message.channel.send({ embed: videoEmbed });
		} catch (error) {
			console.error(error);
			return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
		}
	}

	formatDuration(durationObj) {
		const duration = `${durationObj.hours ? `${durationObj.hours}:` : ''}${durationObj.minutes ? durationObj.minutes : '00'
		}:${durationObj.seconds < 10 ?
			`0${durationObj.seconds}` :
			durationObj.seconds ?
				durationObj.seconds :
				'00'
		}`;
		return duration;
	}

};

