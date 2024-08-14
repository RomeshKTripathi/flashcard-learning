import { useState, useEffect } from "react";

export const useFetch = ({ url, options = { method: "GET" } }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error("Network Response was not ok !");
                }
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (url) fetchData();
    }, [url]);

    return { data, loading, error };
};
