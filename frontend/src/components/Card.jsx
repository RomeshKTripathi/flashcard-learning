import React from "react";

function Card({ questionObj, showAnswer }) {
    return (
        <div className="self-center h-fit w-3/5 grow-0 hover:scale-105 duration-200">
            <div
                className={`relative  rounded-md  border font-semibold p-5 ${
                    showAnswer
                        ? "bg-green-500/30 border-green-400"
                        : "bg-orange-500/30  border-orange-400"
                }`}
            >
                {showAnswer ? null : (
                    <span className="absolute top-1 right-3 text-orange-500 font-extrabold text-2xl">
                        ?
                    </span>
                )}
                <div>
                    {showAnswer ? questionObj?.answer : questionObj?.question}
                </div>
            </div>
        </div>
    );
}

export default Card;
