"use strict";

const Telegram = require('telegram-node-bot');

var startMessage = `لطفا پیش از ثبت نام و فرستادن مشخصات قوانین و شرایط موسسه همسرجون را بخوانید"
					ارسال فرم به منزله قبول شرایط و قوانین موسسه همسرجون است"
					http://www.hamsarjoon.com/membership-conditions.php`;

var keyboard = {reply_markup: JSON.stringify({
		keyboard: [
			['پذیرش قوانین موسسه همسرجون'],
			['عدم پذیرش قوانین موسسه همسرجون']
		],
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