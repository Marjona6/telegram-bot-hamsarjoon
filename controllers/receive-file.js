"use strict";

const Telegram = require('telegram-node-bot');

class ReceiveFileController extends Telegram.TelegramBaseController {
	handle($) {
		console.log($.message);
		$.sendMessage(`ببخشید متوجه نشدم`);
	}
}

module.exports = ReceiveFileController;