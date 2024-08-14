import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";
import useDeleteQuestion from "../hooks/useDeleteItem";
import useQuestionCount from "../hooks/useQuestionCount";
function Dashboard() {
    // Hooks declaration
    const [questions, setQuestions] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [quesPerPage, setQuesPerPage] = useState(5);
    const [selectedPage, setSelectedPage] = useState(0);

    // Custom hooks declaration.
    const { deleteQuestion, deleteLoader } = useDeleteQuestion();
    const { questionCount, getQuestionCount } = useQuestionCount();

    // Member functions
    const deleteItem = (questionObject) => {
        deleteQuestion(questionObject);
        getQuestionCount();
        //deleting question from UI
        setQuestions((prev) => {
            return prev.filter((item) => item.id != questionObject.id);
        });
    };

    useEffect(() => {
        getQuestionCount();
        fetch(
            `http://localhost:4000/api/v1/questions/get-by-range?page=${selectedPage}&limit=5`
        )
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedPage, questions.length == 0]);

    return (
        <div className="relative pt-28 px-4 ">
            <Link to="./add-question">
                <button className="absolute bg-pink-600/20 border border-pink-600 font-semibold hover:bg-pink-600/30 duration-200 transition-colors py-2 px-4 rounded-md top-4 max-sm:right-4 right-8">
                    Add Questions
                </button>
            </Link>
            {questions.length ? (
                <div className="w-2/3 max-md:w-4/5 max-sm:w-full mx-auto ">
                    {questions.map((obj) => (
                        <ListItem
                            key={obj.id}
                            {...{
                                deleteLoader,
                                deleteItem,
                                expanded,
                                obj,
                                onclick: () => {
                                    if (expanded == obj.id) setExpanded(null);
                                    else setExpanded(obj.id);
                                },
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-2xl w-full text-center">
                    {questionCount == null
                        ? "Loading Questions"
                        : questionCount == 0
                        ? "No question found"
                        : "No Question on this page"}
                </div>
            )}
            <div className="max-sm:w-full w-2/3 max-sm:ml-0 mx-auto mt-6 flex justify-between">
                {questionCount ? (
                    <div className="bg-green-500/20 border border-green-500 rounded-full flex gap-2 px-5">
                        {Array.from(
                            { length: Math.ceil(questionCount / quesPerPage) },
                            (val, index) => index
                        ).map((val) => (
                            <span
                                onClick={() => {
                                    setSelectedPage(val);
                                }}
                                className={`p-2 cursor-pointer ${
                                    selectedPage == val
                                        ? "font-semibold text-xl"
                                        : ""
                                }`}
                                key={val}
                            >
                                {val + 1}
                            </span>
                        ))}
                    </div>
                ) : null}
                <div className=""></div>
            </div>
        </div>
    );
}

export default Dashboard;
