const Figmentum = require('./classes/client.js');
const client = new Figmentum();
const { token } = require('./config.json');

client.login(token);
