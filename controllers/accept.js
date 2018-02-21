"use strict";

const Telegram = require('telegram-node-bot');

const errMsg = 'این پاسخ درست نمی باشد';

const form = {
	name: {
		q: 'نام و نام خانوادگی :',
		error: errMsg,
		validator: (message, callback) => {
			if (message.text) {
				callback(true, message.text);
				return;
			}

			callback(false);
		}
	},
	email: {
		q: 'پست الکترونیکی :',
		error: errMsg,
		validator: (message, callback) => {
			if (message.text) {
				callback(true, message.text);
				return;
			}

			callback(false);
		}
	},
	phone: {
		q: 'شماره تماس :',
		error: errMsg,
		validator: (message, callback) => {
            if(message.text && IsNumeric(message.text)) {
                callback(true, toInt(message.text))
                return
            }

            callback(false)
        }
	},
		
}

class AcceptController extends Telegram.TelegramBaseController {
	acceptHandler($) {
		$.sendMessage('لطفا با دقت به پرسش ها ، پاسخ بدهید');
		$.runForm('نام و نام خانوادگی :');
	}

	get routes() {
		return {
			'acceptCommand': 'acceptHandler'
		};
	}
}

module.exports = AcceptController;