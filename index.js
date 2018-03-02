"use strict";

const config = require('./config');
const token = config.token;

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram(token, {workers: 1});

const PingController = require('./controllers/ping');
const OtherwiseController = require('./controllers/otherwise');
const StartController = require('./controllers/start');
const NoAcceptController = require('./controllers/no-accept');
const AcceptController = require('./controllers/accept');
const ReceiveFileController = require('./controllers/receive-file');
const EditDataController = require('./controllers/edit-data');
const ConfirmDataController = require('./controllers/confirm-data');

// Handling unhandled rejections
process.on('unhandledRejection', error => {
	console.log('unhandledRejection:', error.message);
});

// TODO: should not continue asking questions when user does not accept Ts&Cs

tg.router.when(new Telegram.TextCommand('/ping', 'pingCommand'), new PingController())
	// Start conversation with bot
	.when(new Telegram.TextCommand('/start', 'startCommand'), new StartController())
	// User does not accept terms and conditions
	.when(new Telegram.TextCommand('عدم پذیرش قوانین موسسه همسرجون', 'noAcceptCommand'), new NoAcceptController())
	// User accepts terms and conditions
	.when(new Telegram.TextCommand('قبول می کنم', 'acceptCommand'), new AcceptController())
	// User wants to edit input form data
	.when(new Telegram.TextCommand('تایید نمی کنم', 'editDataCommand'), new EditDataController())
	// User confirms that input data is correct (time to send the data!)
	//.when(new Telegram.TextCommand('تایید می کنم', 'confirmDataCommand'), new ConfirmDataController())
	.otherwise(new OtherwiseController());

// tg.addScopeExtension();