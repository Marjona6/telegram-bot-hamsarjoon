"use strict";

const token = require('./config');

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram(token, {workers: 1});

class CustomFilterCommand extends Telegram.BaseCommand {
    /**
     * @param {function} filterCallback
     * @param {string} [handler]
     */
    constructor(filterCallback, handler) {
        super();
        this._filterCallback = filterCallback;
        this._handler = handler;
    }

    /**
     * @param {Scope} scope
     * @returns {boolean}
     */
    test(scope) {
        console.log(this._filterCallback);
        return this._filterCallback(scope);
    }

    /**
     * @returns {string}
     */
    get handlerName() {
        return this._handler;
    }
}

const PingController = require('./controllers/ping');
const OtherwiseController = require('./controllers/otherwise');
const StartController = require('./controllers/start');
const NoAcceptController = require('./controllers/no-accept');
const AcceptController = require('./controllers/accept');
const ReceiveFileController = require('./controllers/receive-file');

// Handling unhandled rejections
process.on('unhandledRejection', error => {
	console.log('unhandledRejection:', error.message);
});

// TODO: should not continue asking questions when user does not accept Ts&Cs

tg.router.when(new Telegram.TextCommand('/ping', 'pingCommand'), new PingController())
	.when(new Telegram.TextCommand('/start', 'startCommand'), new StartController())
	.when(new Telegram.TextCommand('عدم پذیرش قوانین موسسه همسرجون', 'noAcceptCommand'), new NoAcceptController())
	.when(new Telegram.TextCommand('قبول می کنم', 'acceptCommand'), new AcceptController())
	.when(new CustomFilterCommand($ => {
		return $.message},
		 'customFilterHandler'),
	new ReceiveFileController())
	.otherwise(new OtherwiseController());