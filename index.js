require('dotenv').config();
const { Bot } = require('@vnbot/ezbot');
const CustomBot = require('@vnbot/custom-bot');
const path = require('path');
const bot = new Bot({
	email: process.env.EMAIL,
	password: process.env.PASSWORD,
	appStatePath: path.resolve(__dirname, './appstate.json'), // Địa chỉ lưu appstate
});

const ping = require('./plugins/ping');

bot.on('info', (msg) => msg && msg.log && msg.log()); // Hiển thị thông tin

bot.register(
	// Khởi taọ plugin có sẵn
	new CustomBot({
		prefix: 'YOUR_PREFIX',
		name: 'YOUR_NAME',
	})
)
	// Plugin tự viết
	.register(ping);

bot.hear(['ask'], true, (payload, chat) => {
	//tạo câu hỏi
	chat.conversation((convo) => {
		//hỏi
		convo.ask('Yêu tui không?', (payload, convo) => {
			//lưu câu trả lời
			convo.set('love_me', payload.body);
			convo.ask('Thật không?', (payload, convo) => {
				convo.set('confirm', payload.body);
				convo.say(`Bạn đã trả lời ${convo.get('love_me')}, ${convo.get('confirm')}`);
			});
		});
	});
});
bot.hear([new RegExp('cường', 'i')], false, (payload, chat) => {
	chat.say('Bố đây con trai');
});
// Lắng nghe sự kiện tin nhắn (Không khớp những cái trên)
// bot.on('message', (payload, chat) => {
// 	chat.say(payload.body);
// });

bot.start();
