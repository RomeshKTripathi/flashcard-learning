import { createConnection } from "mysql";

class DB_Service {
    connection;
    constructor() {
        this.connection = createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "flashcards",
        });
        this.connection.connect();
    }

    createQuery(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

export default DB_Service;
