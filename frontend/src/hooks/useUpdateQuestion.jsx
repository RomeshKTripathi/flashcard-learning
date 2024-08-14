import { useState } from "react";

export const useUpdateQuestion = () => {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const updateQuestion = ({ id, question, answer }) => {
        setUpdating(true);
        fetch(`http://localhost:4000/api/v1/questions/update-question`, {
            method: "PATCH",
            body: JSON.stringify({ id, question, answer }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => setResult(res))
            .catch((err) => setError(err.message))
            .finally(() => {
                setUpdating(false);
            });
    };

    return { updating, updateQuestion, error, result };
};

export default useUpdateQuestion;
