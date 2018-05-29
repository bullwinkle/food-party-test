/**
 * {
 * 		[[requestHandler]]: function
 * 	}
 */
module.exports = {
	ok: (err, res, next) => {
		res.send("ok");
	}
};