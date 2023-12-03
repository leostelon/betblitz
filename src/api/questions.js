import { default as axios } from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const createQuestion = async function (data) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.post(SERVER_URL + "questions", data, {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const getQuestions = async function () {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.get(SERVER_URL + "questions", {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};