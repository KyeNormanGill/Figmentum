const Command = require('../../classes/command.js');
const { createCanvas } = require('canvas');

module.exports = class StatsCommand extends Command {
	constructor(group) {
		super({
			name: 'stats',
			description: 'Show the stats for the bot.',
			aliases: ['statistics', 'info'],
			group: group
		});
	}

	run(message, args, pre) {
		const canvas = createCanvas(300, 150);
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, 800, 200);

		ctx.fillStyle = '#000000';
		ctx.fillText('Stats and stuff', 50, 50);

		canvas.toBuffer((err, buffer) => {
			if (err) pre.edit('Error with generating image!');
			pre.edit({ files: [{ attachment: buffer }] });
		});
	}
};
