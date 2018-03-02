"use strict";

const Telegram = require('telegram-node-bot');

class EditDataController extends Telegram.TelegramBaseController {
	editDataHandler($) {
		$.sendMessage(`برای تصحیح روی بخش اشتباه کلیک کنید`);
	}

	get routes() {
		return {
			'editDataCommand': 'editDataHandler'
		};
	}
}

module.exports = EditDataController;