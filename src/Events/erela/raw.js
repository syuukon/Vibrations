/* eslint-disable consistent-return */
/* eslint-disable complexity */
const Event = require('../../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: false
		});
	}

	async run(d) {
		if (this.client.music) {
			this.client.music.updateVoiceState(d);
		}
	}

};
