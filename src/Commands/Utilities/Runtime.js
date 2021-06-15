const Command = require('../../Structures/Command');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['runningfor'],
			description: 'Checks how long the bot has been running.',
			category: 'Utilities',
			NSFW: false,
			guildOnly: false
		});
	}

	async run(message) {
		message.channel.send(`Uptime: ${ms(this.client.uptime, { long: true })}`);
	}

};
