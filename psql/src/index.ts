import pg from "pg";
const { Client } = pg;

const client = new Client({
  connectionString:
    "postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable",
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL
        )`);

  console.log(result);
}

//createUsersTable();
async function insertValues() {
  try {
    await client.connect();
    const query =
      "INSERT INTO users (username, email,password) VALUES ($1,$2,$3)";
    const values = ["ishika", "ishika@gmail.com", "12345"];
    const result = await client.query(query, values);
    console.log("Insertion successful");
  } catch (err) {
    console.log("Error inserting");
  } finally {
    await client.end();
  }
}

// insertValues();

async function getValues() {
  try {
    await client.connect();
    const result = await client.query("SELECT * from users");
    if (result.rows.length > 0) {
      console.log(result.rows);
    } else {
      console.log("No user found");
    }
  } catch (e) {
    console.log("error fetching data");
  } finally {
    await client.end();
  }
}

getValues();
