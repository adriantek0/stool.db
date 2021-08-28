const Database = require('better-sqlite3');
let db;

if (!db) db = new Database('./stool.sqlite');

const methods =
{
	get: require('./methods/get.js'),
	set: require('./methods/set.js'),
	add: require('./methods/add.js'),
	subtract: require('./methods/subtract.js'),
	push: require('./methods/push.js'),
	delete: require('./methods/delete.js'),
	has: require('./methods/has.js'),
	all: require('./methods/all.js'),
	type: require('./methods/type'),
};

module.exports =
{
	get: function(key, ops, tableName = undefined)
	{
		if (!key)
		{
			throw new TypeError('No key specified.');
		}

		return arbitrate('get', {
			id: key,
			ops: ops || {}
		}, tableName);
	},

	set: function(key, value, ops, tableName = undefined)
	{
		if (!key)
		{
			throw new TypeError('No key specified.');
		}

		if (value === undefined)
		{
			throw new TypeError('No value specified.');
		}

		return arbitrate('set', {
			stringify: true,
			id: key,
			data: value,
			ops: ops || {},
		}, tableName);
	},

	add: function(key, value, ops, tableName = undefined)
	{
		if (!key) 
		{
			throw new TypeError('No key specified.');
		}

		if (isNaN(value))
		{
			throw new TypeError('Must specify value to add.');
		}

		return arbitrate('add', {
			id: key,
			data: value,
			ops: ops || {}
		}, tableName);
	},

	subtract: function(key, value, ops, tableName = undefined)
	{
		if (!key)
		{
			throw new TypeError('No key specified.');
		}

		if (isNaN(value))
		{
			throw new TypeError('Must specify value to add.');
		}

		return arbitrate('subtract', {
			id: key,
			data: value,
			ops: ops || {}
		}, tableName);
	},

	push: function(key, value, ops, tableName = undefined)
	{
		if (!key)
		{
			throw new TypeError('No key specified.');
		}

		if (!value && value != 0)
		{
			throw new TypeError('Must specify value to push.');
		}

		return arbitrate('push', {
			stringify: true,
			id: key,
			data: value,
			ops: ops || {},
		}, tableName);
	},

	delete: function(key, ops, tableName = undefined)
	{
		if (!key)
		{
			throw new TypeError('No key specified.');
		}

		return arbitrate('delete', {
			id: key,
			ops: ops || {}
		}, tableName);
	},

	has: function(key, ops, tableName = undefined)
	{
		if (!key)
		{
			throw new TypeError('No key specified.');
		}

		return arbitrate('has', {
			id: key,
			ops: ops || {}
		}, tableName);
	},

	includes: function(key, ops, tableName = undefined)
	{
		if (!key)
		{
			throw new TypeError('No key specified.');
		}

		return arbitrate('has', {
			id: key,
			ops: ops || {}
		}, tableName);
	},

	all: function(ops, tableName = undefined)
	{
		return arbitrate('all', {
			ops: ops || {}
		}, tableName);
	},

	fetchAll: function(ops, tableName = undefined)
	{
		return arbitrate('all', {
			ops: ops || {}
		}, tableName);
	},

	type: function(key, ops, tableName = undefined)
	{
		if (!key)
		{
			throw new TypeError('No key specified.');
		}

		return arbitrate('type', {
			id: key,
			ops: ops || {}
		}, tableName);
	},

	table: function(tableName)
	{
		if (typeof tableName !== 'string')
		{
			throw new TypeError('Table name has to be a string.');
		}
		else if (tableName.includes(' '))
		{
			throw new TypeError('Table name cannot include spaces.');
		}

		this.tableName = tableName;

		this.get = function(key, ops)
		{
			exports.get(key, ops, this.tableName);
		}

		this.set = function(key, value, ops)
		{
			exports.set(key, value, ops, this.tableName);
		}

		this.add = function(key, value, ops)
		{
			exports.add(key, value, ops, this.tableName);
		}

		this.subtract = function(key, value, ops)
		{
			exports.subtract(key, value, ops, this.tableName);
		}

		this.push = function(key, value, ops)
		{
			exports.push(key, value, ops, this.tableName);
		}

		this.delete = function(key, ops)
		{
			exports.delete(key, ops, this.tableName);
		}

		this.has = function(key, ops)
		{
			exports.has(key, ops, this.tableName);
		};

		this.includes = function(key, ops)
		{
			exports.includes(key, ops, this.tableName);
		};

		this.fetchAll = function(ops)
		{
			exports.fetchAll(ops, this.tableName);
		};

		this.all = function(ops)
		{
			exports.all(ops, this.tableName);
		};
	},
};

function arbitrate(method, params, tableName)
{
	const options =
	{
		table: tableName || params.ops.table || 'json',
	};

	db.prepare(`CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`).run();

	if (params.ops.target && params.ops.target[0] === '.')
	{
		params.ops.target = params.ops.target.slice(1);
	}

	if (params.data && params.data === Infinity)
	{
		throw new TypeError(`You cannot set Infinity into the database @ ID: ${params.id}`);
	}

	if (params.stringify)
	{
		try
		{
			params.data = JSON.stringify(params.data);
		}
		catch (e)
		{
		 	throw new TypeError(`Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`);
		}
	}

	if (params.id && params.id.includes('.'))
	{
		const unparsed = params.id.split('.');
		params.id = unparsed.shift();
		params.ops.target = unparsed.join('.');
	}

	return methods[method](db, params, options);
}
