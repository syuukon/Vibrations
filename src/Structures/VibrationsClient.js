/* eslint-disable no-process-env */
const { Client, Collection, Permissions } = require('discord.js');
const Util = require('./Util.js');

module.exports = class VibrationsClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();
		this.events = new Collection();
		this.aliases = new Collection();
		this.utils = new Util(this);
		this.owners = process.env.OWNERID;
		this.erela = require('./Erela.js');
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!process.env.DISCORD_TOKEN) throw new Error('You must pass the token for the client.');
		this.token = process.env.DISCORD_TOKEN;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;

		if (!options.defaultPerms) throw new Error('You must pass default perm(s) for the Client.');
		this.defaultPerms = new Permissions(options.defaultPerms).freeze();
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		await super.login(token);
	}

};
