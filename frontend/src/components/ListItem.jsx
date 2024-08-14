import React from "react";
import { EditIcon, DeleteIcon } from "../assets/Icons";
import { useNavigate } from "react-router-dom";

function ListItem({ expanded, obj, onclick, deleteItem }) {
    const navigate = useNavigate();
    const onClickDelete = (e) => {
        e.stopPropagation();
        deleteItem(obj);
    };

    return (
        <div
            onClick={onclick}
            key={obj.id}
            className={`relative w-full border transition-all duration-1000 ${
                obj.id == expanded
                    ? "bg-lime-600/20 border-lime-600"
                    : "bg-sky-600/20  border-sky-600"
            }  rounded-md mb-3 cursor-pointer p-4`}
        >
            <div className="font-semibold flex justify-between">
                <span>{obj.question}</span>

                <div className="flex gap-5">
                    <EditIcon
                        onclick={(event) => {
                            event.stopPropagation();
                            navigate(`./update-question/${obj.id}`);
                        }}
                        style={`transition-colors duration-500 ${
                            obj.id == expanded
                                ? "fill-lime-600 hover:fill-lime-900"
                                : "fill-sky-600 hover:fill-sky-900"
                        }`}
                    />
                    <DeleteIcon
                        onclick={onClickDelete}
                        style={`transition-colors duration-500 ${
                            obj.id == expanded
                                ? "fill-lime-600 hover:fill-lime-900"
                                : "fill-sky-600 hover:fill-sky-900"
                        }`}
                    />
                </div>
            </div>

            <div
                className={` font-light overflow-hidden duration-500 transition-all ${
                    expanded == obj.id ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className={`my-4 h-[1px] w-full bg-lime-600 `}></div>
                {obj.answer}
            </div>
        </div>
    );
}

export default ListItem;
