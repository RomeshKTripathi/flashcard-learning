import React from "react";
import { useForm } from "react-hook-form";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = (formData) => {
        fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status >= 200 && res.status < 300)
                    console.log("User created");
                else console.log(res.message);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="w-1/3 mx-auto pt-28">
            <form
                onSubmit={handleSubmit(submit)}
                className="*:placeholder:text-blue-300/80 *:px-6 *:font-semibold *:rounded-md"
            >
                <input
                    className="w-full h-14 bg-blue-600/30 border border-blue-600 text-white outline-none mb-3"
                    type="text"
                    placeholder="Enter Your name"
                    name="name"
                    {...register("name", { required: true })}
                />
                <input
                    className="w-full h-14 bg-blue-600/30 border border-blue-600 text-white outline-none mb-3"
                    type="email"
                    name="email"
                    placeholder="Enter Your email"
                    {...register("email", { required: true })}
                />
                <input
                    className="w-full h-14 bg-blue-600/30 border border-blue-600 text-white outline-none mb-3"
                    type="password"
                    name="password"
                    placeholder="Create Your Password"
                    {...register("password", { required: true })}
                />
                <button
                    className="w-full h-12 bg-green-400/30 border border-green-400 outline-none rounded-full text-center text-xl "
                    type="submit"
                    value="Register"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
