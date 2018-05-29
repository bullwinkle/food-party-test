# MAIN COMMANDS

### Install all dependencies:
```
npm i
```

### Start dev server:
```
npm start
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

# CONFIGURATION

- `/.env` - environment variables (ENV, APP_BASE_URL, DEV_PORT, API keys etc). It is gitignored. Without this file nothing will work. If not exists, it will be created automatically from `.env.sample`. 
- `/config.js` - builder and server configuration file (common paths, filename templates etc).