const Command = require('../../classes/command.js');
const { stripIndents } = require('common-tags');

module.exports = class FlipCommand extends Command {
	constructor(group) {
		super({
			name: 'flip',
			description: 'Flips a coin.',
			aliases: ['coinflip', 'flipcoin', 'headsortails'],
			group: group
		});
	}

	run(message, args, pre) {
		// Simulate time to generate image
		setTimeout(() => {
			pre.edit(stripIndents`
				**${message.member.displayName}** flipped a coin.
				
				The coin landed on **${Math.random() < 0.5 ? 'Tails' : 'Heads'}**
			`);
		}, 2000);
	}
};
