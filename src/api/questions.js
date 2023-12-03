import { default as axios } from "axios";
import { SERVER_URL } from "../constant";

export const createQuestion = async function (data) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.post(SERVER_URL + "/questions", data, {
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
		const response = await axios.get(SERVER_URL + "/questions", {
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

export const voteQuestion = async function (_id, finalAnswer) {
	try {
		console.log(_id)
		let token = localStorage.getItem("token");
		const response = await axios.post(SERVER_URL + "/questions/vote", {
			question: _id, finalAnswer,
		}, {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 201) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};
