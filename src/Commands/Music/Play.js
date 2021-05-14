const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['p'],
			description: 'Play',
			category: 'Music',
			usage: '<songname>',
			guildsOnly: true,
			args: true
		});
	}

	async run(message) {

	}

};
