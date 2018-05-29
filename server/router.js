// http://expressjs.com/ru/api.html#router.route

/**
 * {
 * 		[[routePath]]: {
 * 			[[httpMethod]]: string (controller key) | function (actual handler),
 * 		}
 * 	}
 */

module.exports = {
	"/_blank": {
		get: "ok"
	}
};