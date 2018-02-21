"use strict";

const Telegram = require('telegram-node-bot');

class NoAcceptController extends Telegram.TelegramBaseController {
	noAcceptHandler($) {
		$.sendMessage('با تشکر از شما خدانگهدار');
	}

	get routes() {
		return {
			'noAcceptCommand': 'noAcceptHandler'
		};
	}
}

module.exports = NoAcceptController;