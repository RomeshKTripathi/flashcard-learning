import { useCallback, useState } from "react";

function useDeleteQuestion() {
    const [deleteError, setDeleteError] = useState("");
    const [deleteLoader, setDeleteLoader] = useState(false);
    const deleteQuestion = useCallback(async (questionObject) => {
        setDeleteError(true);
        try {
            await fetch(
                `http://localhost:4000/api/v1/questions/delete-by-id/${questionObject.id}`,
                {
                    method: "DELETE",
                }
            );
        } catch (error) {
            setDeleteError(error);
        } finally {
            setDeleteLoader(false);
        }
    });

    return { deleteQuestion, deleteLoader, deleteError };
}

export default useDeleteQuestion;
