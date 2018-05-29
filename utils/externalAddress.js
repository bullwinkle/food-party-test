const os = require('os');

exports.getAddresses = function getAddresses () {
	const interfaces = os.networkInterfaces();

	return Object.keys(interfaces)
		.map( netKey => interfaces[netKey] )
		.reduce( (result=[],next)=>result.concat(next))
		.filter( address => !address.internal && address.family === 'IPv4' )
		.map( address => address.address )
		;
};