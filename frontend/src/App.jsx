import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { NextIcon, PrevIcon } from "./assets/Icons";
import { Link } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { RotatingTriangles } from "react-loader-spinner";

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const { data, loading, error } = useFetch({
        url: "http://localhost:4000/api/v1/questions/all",
    });

    const previous = () => {
        if (currentIndex == 0) {
            setCurrentIndex(data.length - 1);
        } else {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const next = () => {
        if (currentIndex == data.length - 1) setCurrentIndex(0);
        else setCurrentIndex((prev) => prev + 1);
    };

    useEffect(() => {
        setShowAnswer(false);
    }, [currentIndex]);

    return loading ? (
        <AppLoader />
    ) : (
        <div className="relative w-screen h-screen bg-green-50  flex justify-center">
            <Link to="/admin">
                <span className="absolute w-40 top-4 right-10 py-2 px-6 border-2 text-indigo-600 font-semibold   duration-200 rounded-full border-indigo-800     cursor-pointer  text-xl flex *:self-end gap-2 hover:text-sky-500 hover:border-sky-500 hover:gap-6 transition-all">
                    <span> Admin</span> <NextIcon />
                </span>
            </Link>

            {currentIndex < data.length ? (
                <Card
                    questionObj={data[currentIndex]}
                    showAnswer={showAnswer}
                />
            ) : (
                <Card
                    questionObj={{ answer: "Now data to show" }}
                    showAnswer={true}
                />
            )}
            <div className="absolute w-full bottom-0 flex justify-center px-10 py-7 gap-20">
                <button
                    onClick={previous}
                    className="outline-none size-12  rounded-full group font-semibold text-green-400 hover:text-rose-500"
                >
                    <PrevIcon
                        style={
                            "mx-auto group-hover:-translate-x-2 duration-200 size-10"
                        }
                    />
                </button>
                <button
                    onClick={() => {
                        setShowAnswer((prev) => !prev);
                    }}
                    className="outline-none py-2 px-4 rounded-md border text-green-500 font-semibold border-green-500  hover:border-rose-500  hover:text-rose-500 duration-200"
                >
                    {showAnswer ? "Hide Answer" : "Show answer"}
                </button>
                <button
                    onClick={next}
                    className="outline-none size-12 group  rounded-full text-green-400 hover:text-rose-500 font-semibold  "
                >
                    <NextIcon
                        style={
                            "mx-auto group-hover:translate-x-2  duration-200 size-10"
                        }
                    />
                </button>
            </div>
        </div>
    );
}

const AppLoader = () => {
    return (
        <div className="relative w-screen h-screen bg-green-50  flex justify-center">
            <div className="size-fit mx-auto mt-52">
                <RotatingTriangles
                    visible={true}
                    height="200"
                    width="200"
                    color="#4fa94d"
                    ariaLabel="rotating-triangles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </div>
    );
};

export default App;
