var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pg from "pg";
const { Client } = pg;
const client = new Client({
    connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable",
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL
        )`);
        console.log(result);
    });
}
//createUsersTable();
function insertValues() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = "INSERT INTO users (username, email,password) VALUES ($1,$2,$3)";
            const values = ["ishika", "ishika@gmail.com", "12345"];
            const result = yield client.query(query, values);
            console.log("Insertion successful");
        }
        catch (err) {
            console.log("Error inserting");
        }
        finally {
            yield client.end();
        }
    });
}
// insertValues();
function getValues() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.query("SELECT * from users");
            if (result.rows.length > 0) {
                console.log(result.rows);
            }
            else {
                console.log("No user found");
            }
        }
        catch (e) {
            console.log("error fetching data");
        }
        finally {
            yield client.end();
        }
    });
}
getValues();
