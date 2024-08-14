/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        keyframes: {
            CardAppear: {
                "0%": { transform: "translateY(-25px)" },
                "100%": { transform: "translateY(0px)" },
            },
        },
        animation: {
            CardAppear: "CardAppear 0.3s ease-out",
        },
    },
    plugins: [],
};
