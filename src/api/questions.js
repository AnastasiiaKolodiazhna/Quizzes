import axios from 'axios'

export const getCategories = () => {
    return axios({
        method: "GET",
        url: `https://opentdb.com/api_category.php`,
    })
        .then((response) => response && response?.data)
        .catch((error) => error.response?.data);
}

export const getQuestions = (amount, category) => {
    return axios({
        method: "GET",
        url: `https://opentdb.com/api.php?amount=${amount}&category=${category}`,
    })
        .then((response) => response && response?.data)
        .catch((error) => error.response?.data);
}