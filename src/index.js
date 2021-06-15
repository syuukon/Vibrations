const VibrationsClient = require('./Structures/VibrationsClient');
const config = require('../config.json');

const client = new VibrationsClient(config);
client.start();
