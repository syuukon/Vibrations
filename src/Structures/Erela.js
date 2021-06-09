/* eslint-disable constructor-super */
/* eslint-disable no-process-env */
require('dotenv').config();
const { Manager } = require('erela.js');

module.exports = {
	connect: (client) => {
		client.music = new Manager({
			nodes: [{
				host: process.env.LAVALINK_HOST,
				port: parseInt(process.env.LAVALINK_PORT),
				password: process.env.LAVALINK_PASS
			}],
			autoPlay: true,
			send(id, payload) {
				const guild = client.guilds.cache.get(id);
				if (guild) guild.shard.send(payload);
			}
		});
	}
};
