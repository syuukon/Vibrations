/* eslint-disable no-process-env */
require('dotenv').config();
const SyuClient = require('./Structures/SyuClient');
const config = {
	user: process.env.DISCORD_TOKEN,
	prefix: process.env.PREFIX,
	defaultPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'SPEAK']
};

const client = new SyuClient(config);
client.start();
