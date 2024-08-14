import DB_Service from "../db_service/connection.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const db = new DB_Service();

const SQL = {
    get_all_questions: "SELECT * FROM questions",
    count_fields: "SELECT COUNT(id) as total from questions",
};

export const getAllQuestions = (req, res) => {
    // read from database.
    db.createQuery(SQL.get_all_questions)
        .then((rows) => {
            console.log(rows);

            res.status(200).json(
                new ApiResponse(true, rows, "Data Fetched Successfully")
            );
        })
        .catch((err) => {
            throw new ApiError(501, err.message);
        });
};

export const getQuestionById = (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(401, "question id is required");
    }

    db.createQuery(`SELECT * FROM questions WHERE id = ${id}`)
        .then((data) => {
            res.status(200).json(
                new ApiResponse(true, data[0], "Question fetched")
            );
        })
        .catch((err) => {
            throw new ApiError(500, err.message);
        });
};

export const getQuestionsInRange = (req, res) => {
    const { page, limit } = req.query;
    if (!page || !limit) {
        throw new ApiError(401, "page and limit is required");
    }

    db.createQuery(
        `SELECT * FROM questions LIMIT ${limit} OFFSET ${limit * page}`
    )
        .then((data) => {
            res.status(200).json(
                new ApiResponse(true, data, "Fetched Successfully")
            );
        })
        .catch((err) => {
            throw new ApiError(501, err.message);
        });
};

export const countAllQuestions = (req, res) => {
    db.createQuery(SQL.count_fields)
        .then((rows) => {
            res.status(200).json(new ApiResponse(true, rows[0], "Success"));
        })
        .catch((err) => {
            throw new ApiError(500, err.message);
        });
};

export const deleteQuestion = (req, res) => {
    const { id } = req.params;
    console.log("Received Parameters : ", req.params);

    if (!id) {
        throw new ApiError(401, "Id is required to delete Question.");
    }

    db.createQuery(`DELETE FROM questions where id = ${id}`)
        .then((data) => {
            res.status(200).json(
                new ApiResponse(
                    true,
                    data,
                    `Any Question with id=${id} deleted Successfully. `
                )
            );
        })
        .catch((err) => {
            throw new ApiError(501, err.message);
        });
};

export const addQuestion = (req, res) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
        throw new ApiError(
            401,
            "Question and Answer are required to add question."
        );
    }

    db.createQuery(
        `INSERT INTO questions(question, answer) VALUES("${question}", "${answer}")`
    )
        .then((rows) => {
            res.status(200).json(
                new ApiResponse(true, rows, "New question Added Successfully")
            );
        })
        .catch((err) => {
            throw new ApiError(500, err.message);
        });
};

export const updateQuestion = (req, res) => {
    const { id, question, answer } = req.body;
    console.log(req.body);

    if (!id || !question || !answer) {
        throw new ApiError(
            401,
            "id, question, answer is required to update question"
        );
    }

    db.createQuery(
        `UPDATE questions SET question="${question}", answer = "${answer}" WHERE id = ${Number(
            id
        )}`
    )
        .then((data) => {
            res.status(200).json(
                new ApiResponse(true, data, "Question Updated Successfully")
            );
        })
        .catch((err) => {
            throw new ApiError(501, err.message);
        });
};
