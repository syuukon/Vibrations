/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const { time } = require('../../Structures/Erela');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['p'],
			description: 'Play a song, or add it to the queue if there\'s another song playing.',
			category: 'Music',
			guildOnly: true,
			args: false
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, args) {
		if (!message.member.voice.channel) return message.channel.send('You must join a voice channel to use this command.');
		if (!args.length) return message.channel.send('Please specify a song name or provide a URL to the song.');

		const search = args.join(' ');
		let res;

		try {
			res = await this.client.music.search(search, message.author);
			if (res.loadType === 'LOAD_FAILED') throw res.exception;
			else if (res.loadType === 'PLAYLIST_LOADED') throw { message: 'Playlists are not currently supported.' };
		} catch (err) {
			return message.channel.send(`Error occurred while searching for track: ${err.message}`);
		}

		const player = this.client.music.create({
			guild: message.guild.id,
			textChannel: message.channel.id,
			voiceChannel: message.member.voice.channel.id
		});

		if (player.state !== 'CONNECTED') {
			player.connect();
		}
		player.queue.add(res.tracks[0]);

		if (!player.playing && !player.paused && !player.queue.size) {
			player.play()
				.then();
			clearTimeout(time);
		}

		if (player.playing && player.queue.size > 0) {
			return message.channel.send(new MessageEmbed()
				.setColor('PURPLE')
				.setDescription(`"${res.tracks[0].title}" queued.`)
			);
		}
	}

};
