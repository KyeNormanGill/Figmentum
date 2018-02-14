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

	async run(message) {
		const canvas = createCanvas(5000, 5000);
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
		ctx.textAlign = 'center';
		ctx.fillText('STATS', 200 / 2, 25);

		ctx.textAlign = 'start';
		for (let i = 0; i < stats.length; i++) {
			ctx.fillText(stats[i], 25, 40 + (i * 12));
		}

		await message.channel.send({ files: [{ attachment: canvas.toBuffer() }] });
	}
};
