# MAIN COMMANDS

### Install all dependencies:
```
npm i
```

### Start dev server:
```
npm start
```

### Tests with Karma:
```
npm run test
```

### Build for production:
```
npm run build
```

##### For local testing of production build run:
```
npm run build
npm run serve
```

# Deploy

#### first time:
```
git clone git@gitlab.g-plans.com:library/frontend.git
cd frontend
cp .env.sample .env
./update.sh
```

#### update:

```
./update.sh
```

# CONFIGURATION

- `/.env` - environment variables (ENV, APP_BASE_URL, DEV_PORT, API keys etc). It is gitignored. Without this file nothing will work. If not exists, it will be created automatically from `.env.sample`. 
- `/config.js` - builder and server configuration file (common paths, filename templates etc).
- `/public/conf.js` - Optional. Client configuration file. Will be loaded on frontend by request and can contain some overwrites of client variables (` window.foo = 'bar';... `). If needed, must be added by hand *after* build procedure.

# Special features

1. Set `API_URL` env variable through url-query parameter, like this: `https://g-plans.com?API_URL=https://backend-feature.d.g-plans.com`
	- Specified `API_URL` will be saved to localStorage, so after page reload will be used the same `API_URL`.
	- To clean it you can add `?API_URL=null` or remove this field from localStorage by hand.
	- After page reload will be user `API_URL` specified in '.env' file.
	
2. Enable *source-maps* loading.
	- By default *source-maps* are disabled with *nginx* and will not be loaded to browser.
	- To enable it, you must add special cookie: `src-map=on`.
	- After page reload *source-maps* will be loaded.
