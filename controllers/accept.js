"use strict";

const Telegram = require('telegram-node-bot');

const form = require('../form');

var checkKeyboard = {reply_markup: JSON.stringify({
		keyboard: [
			['بله'],
			['نه']
		],
		keyboard_resize: true,
		one_time_keyboard: true
	})
};

class AcceptController extends Telegram.TelegramBaseController {
	acceptHandler($) {
		$.sendMessage('لطفا با دقت به پرسش ها ، پاسخ بدهید');
		$.runForm(form, (result) => {
			result = JSON.parse(JSON.stringify(result));
			// console.log(result);
			$.sendMessage('آیا اطلاعات را تایید می کنید', checkKeyboard);
			var userData = ``;
			var userPhotoArray = [];
			for (const prop in result) {
				console.log('Prop: ', prop, 'Result.prop: ', result[prop]);
				if (result.hasOwnProperty(prop) && typeof result[prop] !== 'object') {
					console.log(prop, result[prop]);
					userData += `/${prop}: ${result[prop]}
								`;
				} else if (result.hasOwnProperty(prop) && typeof result[prop] === 'object') {
					// add fileId to some array or...?
					userPhotoArray.push(result[prop][0].file_id);
					console.log(result[prop][0].file_id);
				}
			};
			$.sendMessage(userData);
			console.log('Photo array: ', userPhotoArray);
			// send photo(s)
			// loop through array
			for (let i=0; i<userPhotoArray.length; i++) {
				$.sendPhoto(userPhotoArray[i]);
			}
		});
	}

	get routes() {
		return {
			'acceptCommand': 'acceptHandler'
		};
	}
}

module.exports = AcceptController;