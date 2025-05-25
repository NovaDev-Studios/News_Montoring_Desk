import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


// const navigate = useNavigate();


const API_BASE = 'http://127.0.0.1:5000';

export const fetchNews = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/news`);
        console.log("fetchNews response: ", response);
        console.log("fetchNews response: ", response.data);

        return response.data;
        // toast.success(response.data.message)

    } catch (error) {
        console.error("Error fetching news: ", error);
        toast.error(error.response)
    }
};

export const fetchSentiment = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/sentiment`);
        console.log("fetchSentiment response: ", response);

        return response.data;
    } catch (error) {
        toast.error(error.response)
    }
};

export const fetchTrends = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/trends/generate`);
        console.log("fetchTrends response: ", response);
        return response.data;
    } catch (error) {
        toast.error(error.response)
        // return { error: handleApiError(error) };

    }
};


