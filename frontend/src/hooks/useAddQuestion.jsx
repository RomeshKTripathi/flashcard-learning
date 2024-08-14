import { useState } from "react";

function useAddQuestion() {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const addQuestion = ({ question, answer }) => {
        setProcessing(true);
        fetch(`http://localhost:4000/api/v1/questions/add-question`, {
            method: "POST",
            body: JSON.stringify({ question, answer }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => setResult(res))
            .catch((err) => setError(err.message))
            .finally(() => {
                setProcessing(false);
            });
    };

    return { processing, addQuestion, error, result };
}

export default useAddQuestion;
