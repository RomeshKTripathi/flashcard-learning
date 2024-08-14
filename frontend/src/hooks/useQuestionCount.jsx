import { useState, useEffect, useCallback } from "react";

const useQuestionCount = () => {
    const [questionCount, setQuestionCount] = useState(0);
    const getQuestionCount = useCallback(async () => {
        try {
            let result = await fetch(
                `http://localhost:4000/api/v1/questions/count-all`
            );
            let data = await result.json();
            setQuestionCount(data.data.total);
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    useEffect(() => {
        getQuestionCount();
    }, []);

    return { questionCount, getQuestionCount };
};

export default useQuestionCount;
