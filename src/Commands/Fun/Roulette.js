const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rr'],
			description: 'Fancy your odds? Give it a try.',
			category: 'Fun',
			NSFW: false,
			args: false,
			guildOnly: true
		});
	}

	async run(message) {
		const target = message.member;

		const random = Math.random() * 100;
		// console.log(random);
		if (random < 100 / 6) {
			message.reply('**BANG**');
			target.kick();
		} else {
			message.reply('Click');
		}
	}

};
