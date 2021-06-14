/* eslint-disable no-process-env */
require('dotenv').config();
const VibrationsClient = require('./Structures/VibrationsClient');
const config = {
	user: process.env.DISCORD_TOKEN,
	prefix: process.env.PREFIX,
	defaultPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'SPEAK']
};

const client = new VibrationsClient(config);
client.start();
