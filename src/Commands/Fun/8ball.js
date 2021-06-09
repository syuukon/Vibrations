const Command = require('../../Structures/Command');

const answers = [
	'Maybe.',
	'Certainly not.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!',
	'Could be.',
	'Noooooope.',
	'Keep dreaming, pal.',
	'Potentially!',
	'That is likely, I would say.',
	'I assume so.',
	'Absolutely not!',
	'Never!',
	'Seriously?',
	'That\'s your question???',
	'I don\'t doubt it.',
	'Computer says no.',
	'Yeeboii.',
	'N O P E.',
	'The prophecy is cloudy.',
	'¯\\_(ツ)_/¯',
	'Maybe? Maybe.',
	'Affirmative.',
	'Pretty small chance.',
	'You bet!'
];

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['prophecy', '8b', 'ball'],
			description: 'Answers your questions!',
			category: 'Fun',
			NSFW: false,
			args: true,
			guildOnly: false
		});
	}

	async run(message, ...question) {
		return message.reply(question.join(' ').endsWith('?') ?
			`:thinking: ${answers[Math.floor(Math.random() * answers.length)]}` :
			':thinking: That doesn\'t seem like a question. Please ask me again. (Message must end with ?)');
	}

};
