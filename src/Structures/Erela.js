const { Manager } = require('erela.js');
const { erela } = require('../../config/config.json');

module.exports = {
	connect: (client) => {
		client.music = new Manager({
			nodes: [{
				host: erela.host,
				port: 8080,
				password: erela.password
			}],
			autoPlay: true,
			send(id, payload) {
				const guild = client.guilds.cache.get(id);
				if (guild) guild.shard.send(payload);
			}
		});
	}
};
