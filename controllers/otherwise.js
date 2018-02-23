"use strict";

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
	handle($) {
		$.sendMessage(`ببخشید متوجه نشدم`);
	}
}

module.exports = OtherwiseController;