/* eslint-disable id-length */
/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['q'],
			description: 'Displays the current queue on this server.',
			category: 'Music',
			guildOnly: true,
			args: false
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message) {
		try {
			const { channel } = message.member.voice;
			if (!channel) return message.channel.send('You Have To Be Connected To A Voice Channel!');

			const player = this.client.music.players.get(message.guild.id);
			if (!player) return message.channel.send('Nothing Playing In This Server!');
			if (channel.id !== player.voiceChannel) return message.channel.send('You Have To Be In The Same Voice Channel With The Bot!');

			let currentPage = 0;
			const embeds = this.generateQueueEmbed(message, player.queue);
			const queueEmbed = await message.channel.send(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
			await queueEmbed.react('⬅️');
			await queueEmbed.react('⏹');
			await queueEmbed.react('➡️');

			const filter = (reaction, user) => ['⬅️', '⏹', '➡️'].includes(reaction.emoji.name) && (message.author.id === user.id);
			const collector = queueEmbed.createReactionCollector(filter);

			collector.on('collect', async (reaction) => {
				if (reaction.emoji.name === '➡️') {
					if (currentPage < embeds.length - 1) {
						currentPage++;
						queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
					}
				} else if (reaction.emoji.name === '⬅️') {
					if (currentPage !== 0) {
						--currentPage;
						queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
					}
				} else {
					collector.stop();
					reaction.message.reactions.removeAll();
				}
				await reaction.users.remove(message.author.id);
			});
		} catch (error) {
			console.error(error);
			return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
		}
	}

	generateQueueEmbed(message, queue) {
		const player = this.client.music.players.get(message.guild.id);
		const video = player.queue.current;
		const embeds = [];
		let size = queue.size === 0 && queue.current !== null ? 1 : queue.size;
		let k = 10;
		for (let i = 0; i < size; i += 10) {
			const current = queue.slice(embeds.length === 0 ? i : i - 1, embeds.length === 0 ? k - 1 : k - 1);
			let j;
			// eslint-disable-next-line no-unused-expressions
			embeds.length === 0 ? j = i : j = i - 1;
			k += 10;
			const info = current.map(track => `${++j + 1} - [${track.title}](${track.url})`).join('\n');
			const embed = new MessageEmbed()
				.setTitle('Song Queue\n')
				.setThumbnail(`https://i.ytimg.com/vi/${video.identifier}/hqdefault.jpg`)
				.setColor('PURPLE')
				.setDescription(`\n**Current Song** - [${queue.current.title}](${queue.current.url})\n\n${info}`)
				.setFooter(`Requested By - ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			embeds.push(embed);
		}
		return embeds;
	}

};
