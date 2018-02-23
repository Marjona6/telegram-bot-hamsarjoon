"use strict";

const token = require('./config');

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram(token, {workers: 1});

const PingController = require('./controllers/ping');
const OtherwiseController = require('./controllers/otherwise');
const StartController = require('./controllers/start');
const NoAcceptController = require('./controllers/no-accept');
const AcceptController = require('./controllers/accept');

// Handling unhandled rejections
process.on('unhandledRejection', error => {
	console.log('unhandledRejection:', error.message);
});

tg.router.when(new Telegram.TextCommand('/ping', 'pingCommand'), new PingController())
	.when(new Telegram.TextCommand('/start', 'startCommand'), new StartController())
	.when(new Telegram.TextCommand('عدم پذیرش قوانین موسسه همسرجون', 'noAcceptCommand'), new NoAcceptController())
	.when(new Telegram.TextCommand('پذیرش قوانین موسسه همسرجون', 'acceptCommand'), new AcceptController())
	.otherwise(new OtherwiseController());