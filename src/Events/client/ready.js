const Event = require('../../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		console.log([
			`${this.client.user.tag} successfully logged in.`,
			`Loaded ${this.client.commands.size} commands.`,
			`Loaded ${this.client.events.size} events.`
		].join('\n'));
		this.client.user.setActivity('music.', { type: 'LISTENING' });
		this.client.erela.connect(this.client);
		this.client.music.init(this.client.user.id);
	}

};
