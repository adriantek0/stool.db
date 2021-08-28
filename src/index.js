const Database = require('better-sqlite3');
let db;

if (!db) db = new Database('./database.sqlite');

const methods = {
	get: require('./methods/fetch.js'),
	set: require('./methods/set.js'),
	add: require('./methods/add.js'),
	subtract: require('./methods/subtract.js'),
	push: require('./methods/push.js'),
	delete: require('./methods/delete.js'),
	has: require('./methods/has.js'),
	all: require('./methods/all.js'),
	type: require('./methods/type'),
};

module.exports = {
	version: require('../package.json').version,

	fetch: function(key, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		return arbitrate('fetch', { id: key, ops: ops || {} });
	},
	get: function(key, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		return arbitrate('fetch', { id: key, ops: ops || {} });
	},

	set: function(key, value, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		if (value === undefined) {
			throw new TypeError(
				'No value specified.',
			);
		}
		return arbitrate('set', {
			stringify: true,
			id: key,
			data: value,
			ops: ops || {},
		});
	},

	add: function(key, value, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		if (isNaN(value)) {
			throw new TypeError(
				'Must specify value to add.',
			);
		}
		return arbitrate('add', { id: key, data: value, ops: ops || {} });
	},

	subtract: function(key, value, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		if (isNaN(value)) {
			throw new TypeError(
				'Must specify value to add.',
			);
		}
		return arbitrate('subtract', { id: key, data: value, ops: ops || {} });
	},

	push: function(key, value, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		if (!value && value != 0) {
			throw new TypeError(
				'Must specify value to push.',
			);
		}
		return arbitrate('push', {
			stringify: true,
			id: key,
			data: value,
			ops: ops || {},
		});
	},

	delete: function(key, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		return arbitrate('delete', { id: key, ops: ops || {} });
	},

	has: function(key, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		return arbitrate('has', { id: key, ops: ops || {} });
	},

	includes: function(key, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		return arbitrate('has', { id: key, ops: ops || {} });
	},

	all: function(ops) {
		return arbitrate('all', { ops: ops || {} });
	},

	fetchAll: function(ops) {
		return arbitrate('all', { ops: ops || {} });
	},

	type: function(key, ops) {
		if (!key) {
			throw new TypeError(
				'No key specified.',
			);
		}
		return arbitrate('type', { id: key, ops: ops || {} });
	},

	table: function(tableName) {
		if (typeof tableName !== 'string') {
			throw new TypeError(
				'Table name has to be a string.',
			);
		}
		else if (tableName.includes(' ')) {
			throw new TypeError(
				'Table name cannot include spaces.',
			);
		}
		this.tableName = tableName;

		this.get = function(key, ops) {
			if (!key) {
				throw new TypeError(
					'No key specified.',
				);
			}
			return arbitrate(
				'fetch',
				{ id: key, ops: ops || {} },
				this.tableName,
			);
		};

		this.set = function(key, value, ops) {
			if (!key) {
				throw new TypeError(
					'No key specified.',
				);
			}
			if (!value && value != 0) {
				throw new TypeError(
					'No value specified.',
				);
			}
			return arbitrate(
				'set',
				{ stringify: true, id: key, data: value, ops: ops || {} },
				this.tableName,
			);
		};

		this.add = function(key, value, ops) {
			if (!key) {
				throw new TypeError(
					'No key specified.',
				);
			}
			if (isNaN(value)) {
				throw new TypeError(
					'Must specify value to add.',
				);
			}
			return arbitrate(
				'add',
				{ id: key, data: value, ops: ops || {} },
				this.tableName,
			);
		};

		this.subtract = function(key, value, ops) {
			if (!key) {
				throw new TypeError(
					'No key specified.',
				);
			}
			if (isNaN(value)) {
				throw new TypeError(
					'Must specify value to add.',
				);
			}
			return arbitrate(
				'subtract',
				{ id: key, data: value, ops: ops || {} },
				this.tableName,
			);
		};

		this.push = function(key, value, ops) {
			if (!key) {
				throw new TypeError(
					'No key specified.',
				);
			}
			if (!value && value != 0) {
				throw new TypeError(
					'Must specify value to push.',
				);
			}
			return arbitrate(
				'push',
				{ stringify: true, id: key, data: value, ops: ops || {} },
				this.tableName,
			);
		};

		this.delete = function(key, ops) {
			if (!key) {
				throw new TypeError(
					'No key specified.',
				);
			}
			return arbitrate(
				'delete',
				{ id: key, ops: ops || {} },
				this.tableName,
			);
		};

		this.has = function(key, ops) {
			if (!key) {
				throw new TypeError(
					'No key specified.',
				);
			}
			return arbitrate(
				'has',
				{ id: key, ops: ops || {} },
				this.tableName,
			);
		};

		this.includes = function(key, ops) {
			if (!key) {
				throw new TypeError(
					'No key specified.',
				);
			}
			return arbitrate(
				'has',
				{ id: key, ops: ops || {} },
				this.tableName,
			);
		};

		this.fetchAll = function(ops) {
			return arbitrate('all', { ops: ops || {} }, this.tableName);
		};

		this.all = function(ops) {
			return arbitrate('all', { ops: ops || {} }, this.tableName);
		};
	},
};

function arbitrate(method, params, tableName) {
	const options = {
		table: tableName || params.ops.table || 'json',
	};

	db.prepare(
		`CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`,
	).run();

	if (params.ops.target && params.ops.target[0] === '.') {params.ops.target = params.ops.target.slice(1);}
	if (params.data && params.data === Infinity) {
		throw new TypeError(
			`You cannot set Infinity into the database @ ID: ${params.id}`,
		);
	}

	if (params.stringify) {
		try {
			params.data = JSON.stringify(params.data);
		}
		catch (e) {
			throw new TypeError(
				`Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`,
			);
		}
	}

	if (params.id && params.id.includes('.')) {
		const unparsed = params.id.split('.');
		params.id = unparsed.shift();
		params.ops.target = unparsed.join('.');
	}

	return methods[method](db, params, options);
}
