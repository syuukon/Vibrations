const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ei', 'emoteinfo', 'emoji', 'emote'],
			description: 'Provides information about an emoji.',
			category: 'Information',
			usage: '<emoji>',
			guildsOnly: true,
			args: true
		});
	}

	async run(message, [emote]) {
		const regex = emote.replace(/^<a?:\w+:(\d+)>$/, '$1');

		const emoji = message.guild.emojis.cache.find((emj) => emj.name === emote || emj.id === regex);
		if (!emoji) return message.channel.send('Please provide a valid custom emoji from this server.');

		const authorFetch = await emoji.fetchAuthor();
		const checkOrCross = (bool) => bool ? '☑️' : '❌';

		const embed = new MessageEmbed()
			.setDescription(`**Emoji Info for __${emoji.name.toLowerCase()}__**`)
			.setColor('BLUE')
			.setThumbnail(emoji.url)
			.addField('General:', [
				`**❯ ID:** ${emoji.id}`,
				`**❯ URL:** [Link to Emoji](${emoji.url})`,
				`**❯ Author:** ${authorFetch.tag} (${authorFetch.id})`,
				`**❯ Time Created:** ${moment(emoji.createdTimestamp).format('LT')} ${moment(emoji.createdTimestamp).format('LL')} (${moment(emoji.createdTimestamp).fromNow()})`,
				`**❯ Accessible by:** ${emoji.roles.cache.map((role) => role.name).join(', ') || 'Everyone'}`
			])
			.addField('Other:', [
				`**❯ Requires Colons:** ${checkOrCross(emoji.requiresColons)}`,
				`**❯ Deleteable:** ${checkOrCross(emoji.deletable)}`,
				`**❯ Animated:** ${checkOrCross(emoji.animated)}`,
				`**❯ Managed:** ${checkOrCross(emoji.managed)}`
			]);

		return message.channel.send(embed);
	}

};
