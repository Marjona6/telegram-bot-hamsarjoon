"use strict";
// when user accepts terms and conditions

const Telegram = require('telegram-node-bot');
const nodemailer = require('nodemailer');
const config = require('../config');
const request = require('request');

const GETFILE_ENDPOINT = 'https://api.telegram.org/bot' + config.token;
const PHOTO_ENDPOINT = 'https://api.telegram.org/file/bot' + config.token;

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
	subject: 'پیام از تلگرام همسرجون'
};

const form = require('../form');

var checkKeyboard = {reply_markup: JSON.stringify({
		keyboard: [
			['تایید می کنم'],
			['تایید نمی کنم']
		],
		keyboard_resize: true,
		one_time_keyboard: true
	})
};


class AcceptController extends Telegram.TelegramBaseController {
	acceptHandler($) {
		var userData = ``;
		var userPhotoArray = [];
		var filePathArray = [];
		$.sendMessage('لطفا با دقت به پرسش ها ، پاسخ بدهید');
		$.runForm(form, (result) => {
			result = JSON.parse(JSON.stringify(result));
			// console.log(result);
			$.sendMessage('آیا اطلاعات را تایید می کنید', checkKeyboard);
			for (const prop in result) {
				console.log('Prop: ', prop, 'Result.prop: ', result[prop]);
				// for text properties
				if (result.hasOwnProperty(prop) && typeof result[prop] !== 'object') {
					console.log(prop, result[prop]);
					userData += `/${prop}: ${result[prop]}
								`;
				// for photos
				} else if (result.hasOwnProperty(prop) && typeof result[prop] === 'object') {
					// add fileId to some array or...?
					console.log('length -1:', result[prop].length - 1);
					console.log('should be biggest size photo:', result[prop][result[prop].length - 1]);
					userPhotoArray.push(result[prop][result[prop].length - 1].file_id);
					// get the file path for the photo uploaded by user
					var filePath;
					request.get({
						url: GETFILE_ENDPOINT + '/getFile?file_id=' + result[prop][result[prop].length - 1].file_id
					}, function (error, response, body) {
						body = JSON.parse(body);
						console.log('error:', error); // print error if there is one
						console.log('statusCode:', response && response.statusCode);
						console.log('body:', body);
						// console.log('body.result:', body.result);
						// console.log('body.result.file_path:', body.result.file_path);
						filePath = body.result.file_path;
						filePathArray.push(filePath);

						// get the photo itself
						request.get({
							url: PHOTO_ENDPOINT + '/' + filePath
						}, function(error, response, body) {
							console.log('error:', error);
							console.log('statusCode:', response && response.statusCode);
							console.log('body:', body);
							// userPhotoArray.push(body);
						});
						//var filePath = $.getFile(result[prop][0].file_id);
						console.log(result[prop][result[prop].length - 1].file_id, 'filepath: ', filePath);

						$.sendMessage(`Does this look right? 
										${userData}`);
						console.log('Photo array: ', userPhotoArray);
						// send photo(s)
						// loop through array
						for (let i=0; i<userPhotoArray.length; i++) {
							$.sendPhoto(userPhotoArray[i]);
						}
						// if (message.text == 'تایید می کنم') {
						// if user confirms data is correct
						$.sendMessage(`Your information has been sent! We will get back to you ASAP about your hamsarjoon`);
						// send the email!
						// var photo1 = 
						mailOptions.html = `<h1>Test Hello World Data</h1>
											<p>${userData}</p>
											Embedded image (photo 1): <img alt="photo1" src="cid:photo1@hamsarjoon">
											Embedded image (photo 2): <img alt="photo2" src="cid:photo2@hamsarjoon">`;
						mailOptions.attachments = [{
							filename: 'photo1',
							path: PHOTO_ENDPOINT + '/' + filePathArray[0],
							cid: 'photo1@hamsarjoon'
						}, {
							filename: 'photo2',
							path: PHOTO_ENDPOINT + '/' + filePathArray[1],
							cid: 'photo2@hamsarjoon'
						}];	
						transporter.sendMail(mailOptions, function(error, info) {
							if (error) {
								console.log(error);
							} else {
								console.log('Email sent!', info.response);
							}
						});
					});
				}
			};

			// } 
		});
	}

	get routes() {
		return {
			'acceptCommand': 'acceptHandler'
		};
	}
}

module.exports = AcceptController;