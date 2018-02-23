"use strict";

const Telegram = require('telegram-node-bot');

const form = require('../form');

class AcceptController extends Telegram.TelegramBaseController {
	acceptHandler($) {
		$.sendMessage('لطفا با دقت به پرسش ها ، پاسخ بدهید');
		$.runForm(form, (result) => {
			console.log(result);
			$.sendMessage('Does this look right?');
			var userData = ``;
			for (const prop in result) {
				if (result.hasOwnProperty(prop) && typeof result.prop !== 'object') {
					console.log(result.prop);
					userData += `${result.prop}
								`;
					// $.sendMessage(result.prop);
				} else if (result.hasOwnProperty(prop) && typeof result.prop === 'object') {
					// $.sendPhoto(result.prop);
				}
			};
			$.sendMessage(userData);
			// $.sendMessage('عکس خود را بفرستید');
		});
	}

	get routes() {
		return {
			'acceptCommand': 'acceptHandler'
		};
	}
}

module.exports = AcceptController;