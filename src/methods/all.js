module.exports = function(db, params, options)
{
	const stmt = db.prepare(`SELECT * FROM ${options.table} WHERE ID IS NOT NULL`);
	const resp = [];
	for (const row of stmt.iterate())
	{
		try
		{
			resp.push({
				ID: row.ID,
				data: JSON.parse(row.json),
			});
		}
		catch (e)
		{
			
		}
	}

	return resp;
};
