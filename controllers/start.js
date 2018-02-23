"use strict";

const Telegram = require('telegram-node-bot');

var startMessage = `لطفا پیش از ثبت نام و فرستادن مشخصات قوانین و شرایط موسسه همسرجون را بخوانید"
					ارسال فرم به منزله قبول شرایط و قوانین موسسه همسرجون است"
					http://www.hamsarjoon.com/membership-conditions.php`;

var keyboard = {reply_markup: JSON.stringify({
		keyboard: [
			['قبول می کنم'],
			['عدم پذیرش قوانین موسسه همسرجون']
		],
		keyboard_resize: true,
		one_time_keyboard: true
	})
};

class StartController extends Telegram.TelegramBaseController {
	startHandler($) {
		$.sendMessage(startMessage, keyboard); // initial message to customer
	}

	get routes() {
		return {
			'startCommand': 'startHandler'
		};
	}
}

module.exports = StartController;