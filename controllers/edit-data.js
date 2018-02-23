"use strict";

const Telegram = require('telegram-node-bot');

class EditDataController extends Telegram.TelegramBaseController {
	handle($) {
		$.sendMessage(`برای تصحیح روی بخش اشتباه کلیک کنید`);
	}
}

module.exports = EditDataController;