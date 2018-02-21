const Figmentum = require('./classes/client.js');
const client = new Figmentum({ messageSweepInterval: 10000, messageCacheLifetime: 1, messageCacheMaxSize: 1 });
const { token } = require('./config.json');

client.login(token);
