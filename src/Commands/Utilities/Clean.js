const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['purge'],
			description: 'Removes this bot\'s messages to clean up spam.',
			category: 'Utilities',
			guildsOnly: true,
            args: true
		});
	}

	async run(message) {

	}

};
