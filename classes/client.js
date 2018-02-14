const { Client, Collection } = require('discord.js');
const { prefix, owner } = require('../config.json');
const { promisify } = require('util');
const { readdir } = require('fs');
const { join } = require('path');
const dispatcher = require('./dispatcher.js');

module.exports = class Figmentum extends Client {
	constructor() {
		super();

		this.prefix = prefix;
		this.ownerId = owner;
		this.commandPath = join(__dirname, '..', 'commands');
		this.commands = new Collection();
		this.groups = new Collection();

		this.on('message', dispatcher.handle);
		this.once('ready', async() => {
			console.log(`Logged in as ${this.user.tag}\nPrefix: ${this.prefix}`);

			const readdirAsync = promisify(readdir);
			const groups = await readdirAsync(this.commandPath);

			for (const group of groups) {
				const commands = await readdirAsync(join(this.commandPath, group)); // eslint-disable-line
				this.groups.set(group, []);
				for (const command of commands) {
					const Command = require(join(this.commandPath, group, command));
					const cmd = new Command(group);

					this.commands.set(cmd.name, cmd);
					this.groups.get(group).push(cmd);
				}
			}

			console.log(`Loaded ${this.commands.size} command`);

			this.emit('commandsLoaded', this.commands);
		});
	}
};
