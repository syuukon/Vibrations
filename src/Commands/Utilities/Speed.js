const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['netspeed'],
			description: 'Checks the ping speed of the bot.',
			category: 'Utilities',
			NSFW: false,
			guildOnly: false
		});
	}

	async run(message) {
		const msg = await message.channel.send('Checking ping');

		const latency = message.createdTimestamp - message.createdTimestamp;
		const choices = ['Pretty good!', 'Wow, that\'s fast.', 'Zooming!', ':rocket:'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
	}

};
