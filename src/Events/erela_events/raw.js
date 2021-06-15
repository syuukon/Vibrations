const Event = require('../../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: false
		});
	}

	async run(state) {
		if (this.client.music) {
			this.client.music.updateVoiceState(state);
		}
	}

};
