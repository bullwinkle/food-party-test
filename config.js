const fs = require('fs');
const dotEnv = require('dotenv');
const path = require('path');
const ROOT = process.cwd();

// CREATE '.env' if not exists
const dotEnvFile = path.join(ROOT,'.env');
const dotEnvFileSample = path.join(ROOT,'.env.sample');
if (!fs.existsSync(dotEnvFile)) {
  console.warn(`'.env' file created automatically`);
  fs.copyFileSync(dotEnvFileSample,dotEnvFile);
}

dotEnv.config({silent: true});

const ENV = envVar('ENV', 'production');

exports.CONFIG = {
	APP_PORT: envVar('APP_PORT', 9002),
	DEV_PORT: envVar('DEV_PORT', 9001),
	APP_BASE_URL: envVar('APP_BASE_URL', '/'),
	JS_TEMPLATE: 'dist/js/[name]__[hash].js',
	JS_CHUNK_TEMPLATE: 'dist/js/chunk/[name]-[id]__[chunkhash].js',
	CSS_TEMPLATE: 'dist/css/[name]__[hash].css',
	CSS_LOCALS_TEMPLATE: 'dist/css/[local]__[hash:base64:10]',
	ASSET_TEMPLATE: 'dist/assets/[path][name]__[hash].[ext]',
	ASSET_LIMIT_KB: 10,
	CLIENT_ENV_VARS: [
		'ENV',
		'APP_BASE_URL',
    'API_URL'
	]
};

exports.PATHS = {
	ROOT,
	SRC: root('src'),
	DIST: root('dist'),
	TEST: root('test'),
	PAGES: root('src/pages'),
	REPORTS: root('reports'),
	VENDOR: root('bower_components'),
	MODULES: root('app'),
	TMP: root('tmp')
};

exports.utils = {
	root,
	src,
	fixOSX,
	sortChunks
};


function root (p = '') {
	return path.join(ROOT, p);
}

function src (p = '') {
	return path.join(exports.PATHS.SRC, p);
}

function fixOSX (blob) {
	return {
		pattern: blob,
		watched: false,
		included: true,
		served: true
	};
}

function sortChunks( entries,a,b ) {  //order like in cfg
	let indexA = entries.indexOf( a.names[ 0 ] );
	let indexB = entries.indexOf( b.names[ 0 ] );
	if ( indexA > indexB ) {
		return 1;
	}
	if ( indexA < indexB ) {
		return -1;
	}
	return -1;
}

function envVar (name, defaultValue) {
	return process.env[name] || defaultValue;
}

