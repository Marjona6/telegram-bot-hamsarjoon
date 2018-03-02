"use strict";

const Telegram = require('telegram-node-bot');
const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
	service: config.service,
	auth: {
		user: config.user,
		pass: config.pass
	}
});

const mailOptions = {
	from: config.user,
	to: config.targetEmail,
	subject: 'پیام از تلگرام همسرجون',
	//html: `<p>Test</p>
			//` // TODO
};

class ConfirmDataController extends Telegram.TelegramBaseController {
	handle($) {
		$.sendMessage(`Your information has been sent! We will get back to you ASAP about your hamsarjoon`);
		// send the email!
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent!', info.response);
			}
		});
	}
}

module.exports = ConfirmDataController;