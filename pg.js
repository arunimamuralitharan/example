const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_user',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

async function batchInsert(dataArray) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Convert array of arrays to SQL VALUES format
    const values = dataArray
      .map((row, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`)
      .join(',');

    const flattenedValues = dataArray.flat();

    const query = `INSERT INTO your_table (column1, column2, column3) VALUES ${values}`;

    await client.query(query, flattenedValues);

    await client.query('COMMIT');
    console.log('Batch insert successful');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Batch insert failed:', err);
  } finally {
    client.release();
  }
}

// Example usage
const data = [
  ['value1', 'value2', 'value3'],
  ['value4', 'value5', 'value6'],
];

batchInsert(data);
