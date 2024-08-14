import React from "react";
import QuestionForm from "./QuestionForm";
import useUpdateQuestion from "../hooks/useUpdateQuestion";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function UpdateQuestion() {
    const { id } = useParams();
    const { data, loading, error } = useFetch({
        url: `http://localhost:4000/api/v1/questions/get-by-id/${id}`,
    });
    const { updating, updateQuestion } = useUpdateQuestion();

    const handleUpdateQuestion = (formData) => {
        if (
            formData.question != data.question ||
            formData.answer != data.answer
        )
            updateQuestion(formData);
    };

    return loading ? null : (
        <QuestionForm
            submitForm={handleUpdateQuestion}
            questionObject={data}
            processing={updating}
            type="update"
        />
    );
}

export default UpdateQuestion;
