/* eslint-disable no-process-env */
const ms = require('ms');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['purge'],
			description: 'Removes this bot\'s messages to clean up spam.',
			category: 'Utilities',
			guildsOnly: true,
			args: false
		});
	}

	async run(message) {
		if (message.channel.type === 'text') {
			message.channel.messages.fetch().then(messages => {
				const botMessages = messages.filter(message => (message.author.id === process.env.BOTID) && (!message.pinned) && (message.createdTimestamp - Date.now()) < ms('14d'));
				message.channel.bulkDelete(botMessages);
				const messagesDeleted = botMessages.array().length;

				message.channel.send(`My messages deleted: ${messagesDeleted}`).then(message => {
					message.delete({ timeout: 2500 });
				})
				.catch(console.error);
				console.log(`Bot messages deleted: ${messagesDeleted} (${message.channel.name} - ${message.guild.name})`);
			}).catch(err => {
				console.log('Error deleting bot messages');
				console.log(err);
			});
		}
	}

};
