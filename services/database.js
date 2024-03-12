const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	// database:	'postgres',
	// user: 'user',
	// password: 'password',
	// host: 'host',
	// port: 5432,
	// databaseName: 'databasename',
});
module.exports = {
	pool,
}