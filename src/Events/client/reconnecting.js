/* eslint-disable consistent-return */
/* eslint-disable complexity */
const Event = require('../../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: false
		});
	}

	async run(client) {
		console.log(`${client.tag} attempted to reconnect at ${new Date()}.`);
	}

};
