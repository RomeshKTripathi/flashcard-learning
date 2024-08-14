import React from "react";
import { useForm } from "react-hook-form";

const BTN = {
    add: {
        processing: "Adding Question",
        default: "Add Question",
    },
    update: {
        processing: "Updating Quesion",
        default: "Update Question",
    },
};

function QuestionForm({
    submitForm,
    questionObject,
    processing,
    type = "add",
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: questionObject });

    const submit = (formData) => {
        reset({
            question: "",
            answer: "",
        });
        submitForm(formData);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="w-2/3 mt-44 mx-auto ">
            <input
                className="border-l-[5px] border-transparent outline-none w-full rounded-md h-10 px-10 text-lg mb-6 text-lime-700 bg-lime-600/5 focus:border-lime-700 transition-colors duration-200 font-semibold placeholder:text-lime-800/40"
                type="text"
                name="question"
                {...register("question", { required: true })}
                placeholder="Type a question"
                id="1"
            />
            <textarea
                className="border-l-[5px] border-transparent outline-none w-full rounded-md text-xl  px-10 py-4 font-light text-sky-700 h-60 bg-sky-600/5 focus:border-sky-700 transition-colors duration-300 placeholder:text-sky-800/40 placeholder:text-2xl"
                type="text"
                name="question"
                {...register("answer", { required: true })}
                placeholder="Write your answer !"
                id="1"
            />
            <button
                disabled={processing}
                onSubmit={handleSubmit(submit)}
                type="submit"
                id="3"
                className="w-full bg-teal-800/10 border border-teal-800 outline-teal-700  p-3 mt-4 text-2xl font-bold text-teal-900 rounded-md"
            >
                {processing ? BTN[type].processing : BTN[type].default}
            </button>
        </form>
    );
}

export default QuestionForm;
