import { createConnection } from "mysql";

class DB_Service {
    connection;
    constructor() {
        this.connection = createConnection({
            host: "localhost",
            user: "root",
            password: "Romesh@#123",
            database: "flashcards",
            insecureAuth: true,
        });

        this.connection.connect((err) => {
            if (err) {
                console.log("Error Occured::", err);
                this.connection.createQuery("USE flashcards");
            } else {
                console.log("Connected..");
                console.log(this.connection);
            }
        });
    }

    checks() {
        // create user table if not exists;
        // this.createQuery("")
        // create flashcards table if not exists
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
