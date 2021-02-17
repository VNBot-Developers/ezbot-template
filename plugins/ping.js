module.exports = (bot) => {
	bot.hear(['ping'], true, (payload, chat) => {
		chat.say('Pong!');
	});
};
