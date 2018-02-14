const Command = require('../../classes/command.js');
const { createCanvas } = require('canvas');
const moment = require('moment');
require('moment-duration-format');

module.exports = class StatsCommand extends Command {
	constructor(group) {
		super({
			name: 'stats',
			description: 'Show the stats for the bot.',
			aliases: ['statistics', 'info'],
			group: group
		});
	}

	run(message) {
		const canvas = createCanvas(300, 125);
		const ctx = canvas.getContext('2d');

		const stats = [
			`Uptime: ${moment.duration(message.client.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]')}`,
			`Memory usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
			`Ping: ${Math.round(message.client.ping)}ms`,
			`Guilds: ${message.client.guilds.size}`,
			`Users: ${message.client.guilds.reduce((p, c) => p + c.memberCount, 0)}`
		];

		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, 800, 200);

		ctx.fillStyle = '#000000';

		for (let i = 0; i < stats.length; i++) {
			ctx.fillText(stats[i], 25, 25 + (i * 10));
		}

		return message.channel.send({ files: [{ attachment: canvas.toBuffer() }] });
	}
};
