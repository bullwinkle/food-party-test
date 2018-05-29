const express = require('express')
	, compession = require('compression')
	, path = require('path')
	, url = require('url')
;

const APP = express()
	, {CONFIG, PATHS} = require('../config')
	, {APP_BASE_URL} = CONFIG
	, PUBLIC = PATHS.DIST
	, INDEX_PAGE = path.join(PUBLIC, 'index.html')
;

const appRouter = require('./router')
	, appController = require('./controller')
	, {getAddresses} = require("../utils/externalAddress")
;

const defaults = {
	port: CONFIG.APP_PORT
};

APP.use(compession({
	level: 9,
	memLevel: 5
}));

APP.use(APP_BASE_URL,express.static(PUBLIC));

if (APP_BASE_URL !== '/') {
	APP.get('/',(req,res,next)=>{
		res.redirect(APP_BASE_URL)
	});
}

for (let route in appRouter) {
	let appRoute = APP.route(route);
	for (let routeMethod in appRouter[route]) {
		if (typeof appRoute[routeMethod] !== 'function') {
			console.error(`route method for ${routeMethod} doesn\`t allow`);
			continue;
		}

		let handler = appRouter[route][routeMethod];
		if (typeof handler === "string") {
			if (!appController[handler]) {
				console.error(`route handler for ${routeMethod}:${route} wasn\`t found in controller`);
				continue;
			}
			appRoute[routeMethod](appController[handler]);
		} else if (typeof handler === "function") {
			appRoute[routeMethod](handler);
		}
	}
}

APP.use(APP_BASE_URL, (req, res, next) => {
	if (req.accepts('html')) res.sendFile(INDEX_PAGE);
	else res.send("ok");
});


function start(opts = {}, cb = i=>i) {
	const options = Object.assign(defaults,opts);
	APP.listen(options.port, () => {
		const listeningOn = url.format({
			protocol: 'http',
			hostname: getAddresses()[0],
			port: options.port
		});
		console.log('Serving files from: ' + PUBLIC);
		console.log('Listening on: ' + listeningOn);
		cb()
	});
}

module.exports = start;
if (!module.parent) start();
