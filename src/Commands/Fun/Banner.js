const Command = require('../../Structures/Command');
const figlet = require('util').promisify(require('figlet'));

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['display'],
			description: 'Turn your message into a banner.',
			category: 'Fun',
			NSFW: false,
			args: true,
			guildOnly: false
		});
	}

	async run(message, ...banner) {
		return message.channel.send(await figlet(banner), { code: true });
	}

};
