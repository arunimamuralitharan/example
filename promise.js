const pgp = require('pg-promise')();
const db = pgp('postgres://your_user:your_password@your_host:5432/your_database');

async function batchUpload(dataArray) {
  try {
    // Define the column names for your table
    const columnSet = new pgp.helpers.ColumnSet(['column1', 'column2', 'column3'], { table: 'your_table' });

    // Generate the INSERT query
    const insertQuery = pgp.helpers.insert(dataArray.map(row => ({ column1: row[0], column2: row[1], column3: row[2] })), columnSet);

    // Execute the query
    await db.none(insertQuery);

    console.log('Batch upload completed successfully');
  } catch (err) {
    console.error('Error in batch upload:', err);
  }
}

// Example usage
const data = [
  ['value1', 'value2', 'value3'],
  ['value4', 'value5', 'value6'],
];

batchUpload(data);
