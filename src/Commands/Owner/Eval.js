const Command = require('../../Structures/Command');
const { MessageAttachment } = require('discord.js');
const { inspect } = require('util');
const { Type } = require('@anishshobith/deeptype');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ev'],
			description: 'Allows immediate use of custom JS code.',
			category: 'Owner',
			ownerOnly: true,
			args: true
		});
	}

	async run(message, args) {
		const msg = message;
		if (!args.length) return message.channel.send('Must provide code to be evaluated.');
		if (message.content.includes('client.token')) {
			console.log('Attempt of bot token theft occured via =eval command.');
			console.log('Eval command automatically stopped to protect the token.');
			return message.reply('Absolutely not. Owner alerted.');
		}
		let code = args.join(' ');
		code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
		let evaled;
		try {
			const start = process.hrtime();
			evaled = eval(code);
			if (evaled instanceof Promise) {
				evaled = await evaled;
			}
			const stop = process.hrtime(start);
			const response = [
				`**Output:** \`\`\`js\n${this.clean(inspect(evaled, { depth: 0 }))}\n\`\`\``,
				`**Type:** \`\`\`js\n${new TypeError(evaled).is}\n\`\`\``,
				`**Time Taken:** \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
			];
			const res = response.join('\n');
			if (res.length < 2000) {
				await msg.channel.send(res);
			} else {
				const output = new MessageAttachment(buffer.from(res), 'output.txt');
				await msg.channel.send(output);
			}
		} catch (err) {
			return message.channel.send(`Error: \`\`\`xl\n${this.clean(err)}\n\`\`\``);
		}
	}

	clean(text) {
		if (typeof text === 'string') {
			text = text
				.replace(/` /g, `\`${String.fromCharCode(8203)}`)
				.replace(/@/g, `@${String.fromCharCode(8203)}`)
				.replace(new RegExp(this.client.token, 'gi'), '****');
		}
		return text;
	}

};
