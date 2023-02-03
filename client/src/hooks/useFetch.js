import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
};

export default useFetch;
