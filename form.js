"use strict";

const errMsg = 'این پاسخ درست نمی باشد';

const validatorStandard = (message, callback) => {
			if (message.text) {
				callback(true, message);
				return;
			}
			callback(false);
		};

const form = {
	name: {
		q: 'نام و نام خانوادگی :',
		error: errMsg,
		validator: validatorStandard,
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
		// TODO: use request_contact as a parameter in KeyboardButton object
		q: 'شماره تماس :',
		error: errMsg,
		validator: (message, callback) => {
            if (message.text) {
                callback(true, parseInt(message.text));
                return;
            } else {
            	console.log(message._contact._phoneNumber);
            	callback(true, parseInt(message._contact._phoneNumber));
            	return;
            }

            callback(false);
        },
        keyboard: [
        	[{
        		text: 'Press to share phone number',
        		request_contact: true
        	}],
        	[{
        		text: 'Press to enter phone number'
        	}]
        ],
        one_time_keyboard: true // not working--why?
	},
	country: {
		// TODO: use request_location as a parameter in KeyboardButton object
		// (hard to do this--may need to pay for a 3rd-party service like google)
		q: 'کشور :',
		error: errMsg,
		validator: (message, callback) => {
			if (message.text) {
				callback(true, message);
				return;
			}
			callback(false);
		}
	},
	city: {
		// TODO: make a list of these for user to choose from?
		q: 'شهری که سکونت دارید :',
		error: errMsg,
		validator: (message, callback) => {
			if (message.text) {
				callback(true, message);
				return;
			}
			callback(false);
		}
	},
	age: {
		q: 'سن :',
		error: errMsg,
		validator: (message, callback) => {
			if (message.text) {
				callback(true, message);
				return;
			}
			callback(false);
		}
	},
	height: {
		q: 'قد :',
		error: errMsg,
		validator: validatorStandard
	},
	weight: {
		q: 'وزن :',
		error: errMsg,
		validator: validatorStandard
	}
}

module.exports = form;

/*
var keyboard = {reply_markup: JSON.stringify({
		keyboard: [
			['پذیرش قوانین موسسه همسرجون'],
			['عدم پذیرش قوانین موسسه همسرجون']
		],
		one_time_keyboard: true
	})
};
*/