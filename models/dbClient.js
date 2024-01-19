const { Client } = require("pg");

const client = new Client(`postgresql://drink_genius:drink_genius@localhost/drink_genius`)

client.connect();

module.exports = client;