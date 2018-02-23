"use strict";

const Telegram = require('telegram-node-bot');

const form = require('../form');

class AcceptController extends Telegram.TelegramBaseController {
	acceptHandler($) {
		$.sendMessage('لطفا با دقت به پرسش ها ، پاسخ بدهید');
		$.runForm(form, (result) => {
			console.log(result);
			$.sendMessage('Thank you for your information');
		});
	}

	get routes() {
		return {
			'acceptCommand': 'acceptHandler'
		};
	}
}

module.exports = AcceptController;